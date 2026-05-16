#!/usr/bin/env node
// Syncs TASKS.md unchecked tasks to GitHub issues.
// Mapping stored in .tasks-sync.json (title -> issue number).

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');
const TASKS_FILE = path.join(REPO_ROOT, 'TASKS.md');
const MAPPING_FILE = path.join(REPO_ROOT, '.tasks-sync.json');

function parseTasks(content) {
  const tasks = [];
  const lines = content.split('\n');
  let currentSection = '';
  let inDoneSection = false;
  let inProgressSection = false;

  for (const line of lines) {
    if (/^## In Progress/.test(line)) { inProgressSection = true; inDoneSection = false; continue; }
    if (/^## Done/.test(line)) { inDoneSection = true; inProgressSection = false; continue; }
    if (/^## /.test(line)) { inDoneSection = false; inProgressSection = false; }

    const sec = line.match(/^###\s+(.+)/);
    if (sec) { currentSection = sec[1].trim(); continue; }

    const task = line.match(/^-\s+\[([ x])\]\s+\*\*(.+?)\*\*/);
    if (task) {
      tasks.push({
        title: task[2].trim(),
        done: task[1] === 'x' || inDoneSection,
        inProgress: inProgressSection,
        section: currentSection,
      });
    }
  }
  return tasks;
}

function loadMapping() {
  return fs.existsSync(MAPPING_FILE)
    ? JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'))
    : { tasks: {} };
}

function saveMapping(m) {
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(m, null, 2));
}

function gh(...args) {
  const result = spawnSync('gh', args, { encoding: 'utf8', cwd: REPO_ROOT });
  return result.status === 0 ? result.stdout.trim() : null;
}

function currentBranch() {
  const result = spawnSync('git', ['branch', '--show-current'], { encoding: 'utf8', cwd: REPO_ROOT });
  return result.status === 0 ? result.stdout.trim() : null;
}

function stripBranchLine(body) {
  return body.replace(/\*\*Branch:\*\*[^\n]*\n?\n?/g, '').trim();
}

function setBranchOnIssue(issueNum, branch) {
  const currentBody = gh('issue', 'view', String(issueNum), '--json', 'body', '--jq', '.body') || '';
  const branchLine = `**Branch:** \`${branch}\``;
  const stripped = stripBranchLine(currentBody);
  const newBody = stripped ? `${branchLine}\n\n${stripped}` : branchLine;
  if (currentBody.trim() === newBody.trim()) return;
  gh('issue', 'edit', String(issueNum), '--body', newBody);
}

function clearBranchOnIssue(issueNum) {
  const currentBody = gh('issue', 'view', String(issueNum), '--json', 'body', '--jq', '.body') || '';
  if (!currentBody.includes('**Branch:**')) return;
  gh('issue', 'edit', String(issueNum), '--body', stripBranchLine(currentBody));
}

const SECTION_LABELS = {
  'Visual / Design': ['UI', 'design'],
  'Charts': ['UI', 'charts'],
  'Auth': ['auth', 'backend'],
  'Onboarding': ['UI', 'onboarding'],
  'UX / Polish': ['UI', 'enhancement'],
  'Infra': ['infra'],
  'Visual Fidelity — Screen by Screen': ['UI', 'design'],
  'Design System Components to Build': ['UI', 'design'],
  'Cleanup': ['cleanup'],
};

function syncInProgressLabel(issueNum, shouldHaveLabel, currentLabels) {
  const has = currentLabels.includes('in-progress');
  if (shouldHaveLabel && !has) {
    gh('issue', 'edit', String(issueNum), '--add-label', 'in-progress');
    return 'added';
  }
  if (!shouldHaveLabel && has) {
    gh('issue', 'edit', String(issueNum), '--remove-label', 'in-progress');
    return 'removed';
  }
  return null;
}

function main() {
  const tasks = parseTasks(fs.readFileSync(TASKS_FILE, 'utf8'));
  const mapping = loadMapping();
  const branch = currentBranch();
  let created = 0, closed = 0, reopened = 0, labeled = 0;

  for (const task of tasks) {
    const entry = mapping.tasks[task.title];

    if (entry) {
      const info = gh('issue', 'view', String(entry.number), '--json', 'state,labels', '--jq', '[.state, (.labels | map(.name) | join(","))] | join("|")');
      const [state, labelsStr] = (info || '').split('|');
      const currentLabels = labelsStr ? labelsStr.split(',') : [];

      if (task.done && state === 'OPEN') {
        gh('issue', 'close', String(entry.number));
        mapping.tasks[task.title].status = 'closed';
        closed++;
        console.log(`Closed  #${entry.number}: ${task.title}`);
      } else if (!task.done && state === 'CLOSED') {
        gh('issue', 'reopen', String(entry.number));
        mapping.tasks[task.title].status = 'open';
        reopened++;
        console.log(`Reopen  #${entry.number}: ${task.title}`);
      }

      if (!task.done) {
        const change = syncInProgressLabel(entry.number, task.inProgress, currentLabels);
        if (change === 'added') {
          labeled++;
          console.log(`In-prog #${entry.number}: ${task.title}`);
          if (branch) setBranchOnIssue(entry.number, branch);
        }
        if (change === 'removed') {
          labeled++;
          console.log(`Unlab   #${entry.number}: ${task.title}`);
          clearBranchOnIssue(entry.number);
        }
        // Keep branch up-to-date if already in-progress
        if (change === null && task.inProgress && branch) {
          setBranchOnIssue(entry.number, branch);
        }
      }
    } else if (!task.done) {
      const baseLabels = SECTION_LABELS[task.section] || ['enhancement'];
      const labels = task.inProgress ? [...baseLabels, 'in-progress'] : baseLabels;
      const body = task.inProgress && branch ? `**Branch:** \`${branch}\`` : '';
      const args = ['issue', 'create', '--title', task.title, '--label', labels.join(',')];
      if (body) args.push('--body', body);
      const result = gh(...args);
      const match = result && result.match(/issues\/(\d+)/);
      if (match) {
        const num = parseInt(match[1]);
        mapping.tasks[task.title] = { number: num, status: 'open' };
        created++;
        console.log(`Created #${num}: ${task.title}`);
      }
    }
  }

  saveMapping(mapping);
  console.log(`\nSync: +${created} created, -${closed} closed, ~${reopened} reopened, *${labeled} labeled`);
}

main();
