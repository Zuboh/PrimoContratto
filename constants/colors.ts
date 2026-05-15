// Exact values from Primo Design System.html

export const colors = {
  // ── Sage (primary brand) ────────────────────
  primary: '#4F6B4A',          // sage-700 — CTA, active states
  primaryDark: '#3F5A45',      // sage-900 — pressed/hover
  primaryLight: '#E8EEDC',     // sage-50 — chip backgrounds
  primaryForeground: '#FFFFFF',

  // ── Backgrounds (warm cream) ────────────────
  background: '#F5ECDC',       // --bg — page background
  bg2: '#F1E7D4',              // --bg-2 — depth layer
  surface: '#FBF6EA',          // --surface — cards & sheets
  surface2: '#EFE6D2',         // --surface-2 — sage-tinted hints
  surface3: '#E8E0CC',         // --surface-3 — dividers, fields
  surfaceAlt: '#EFE6D2',       // alias → surface2

  // ── Sage scale ──────────────────────────────
  sage900: '#3F5A45',
  sage700: '#4F6B4A',
  sage600: '#5F8D76',          // accent, links, chart dots
  sage300: '#BFCEBA',          // surface tints
  sage100: '#DCE5D1',          // soft sage wash
  sage50: '#E8EEDC',           // lightest chip bg

  // ── Ink / Text ──────────────────────────────
  foreground: '#1A1A1A',       // --ink — primary text & icons
  ink2: '#2C2A26',             // --ink-2 — alt text on warm surfaces
  muted: '#6F6A60',            // --muted — secondary text
  muted2: '#9A938A',           // --muted-2 — captions, tertiary
  placeholder: '#9A938A',      // alias → muted2

  // ── Borders ─────────────────────────────────
  border: '#E8E0CC',           // --surface-3
  borderStrong: '#BFCEBA',     // --sage-300

  // ── Status — success (sage) ─────────────────
  success: '#5F8D76',          // --success = sage-600
  successLight: '#DCE5D1',     // --sage-100
  successBorder: '#BFCEBA',    // --sage-300

  // ── Status — warning (warm orange) ──────────
  warn: '#E29A4B',             // --warn
  warnSoft: '#F5C994',         // --warn-soft
  warning: '#E29A4B',          // alias → warn
  warningLight: '#F5C994',     // alias → warnSoft
  warningBorder: '#E29A4B',

  // ── Status — danger (warm red) ──────────────
  danger: '#C8624A',           // --danger
  destructive: '#C8624A',      // alias → danger
  destructiveLight: '#F9E4DF',
  destructiveBorder: '#E8B8AF',

  // ── Info (blue) ─────────────────────────────
  info: '#7B8FB8',             // --info — secondary chart, badges

  // ── Misc ────────────────────────────────────
  overlay: 'rgba(26,26,26,0.5)',
  shadowPrimary: 'rgba(63,90,69,0.15)',
  transparent: 'transparent',
} as const

export type ColorKey = keyof typeof colors

export const STATUS_COLORS: Record<'green' | 'yellow' | 'red', string> = {
  green: '#5F8D76',   // sage-600
  yellow: '#E29A4B',  // warn
  red: '#C8624A',     // danger
}
