import { error, json } from '../lib/cors.ts';
import { callOpenAI } from '../lib/openai.ts';
import { ANALYZE_SYSTEM_PROMPT } from '../prompts/analize.ts';

export async function handleAnalyze(body: unknown): Promise<Response> {
  const { base64, type } = body as { base64: string; type: 'pdf' | 'image' }

  try {
    let messages

    if (type === 'image') {
      // Immagini → image_url funziona
      messages = [
        { role: 'system' as const, content: ANALYZE_SYSTEM_PROMPT },
        {
          role: 'user' as const,
          content: [
            {
              type: 'image_url' as const,
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
                detail: 'high' as const,
              },
            },
            {
              type: 'text' as const,
              text: 'Analizza questo contratto di lavoro italiano.',
            },
          ],
        },
      ]
    } else {
      // PDF → manda come testo base64 nel messaggio
      messages = [
        { role: 'system' as const, content: ANALYZE_SYSTEM_PROMPT },
        {
          role: 'user' as const,
          content: `Analizza questo contratto di lavoro italiano. Il documento è in formato base64 PDF:\n\n${base64}`,
        },
      ]
    }

    const result = await callOpenAI(messages, 2000)
    return json({ result })
  } catch (e) {
    console.error('Errore:', e instanceof Error ? e.message : e)
    return error(500, e instanceof Error ? e.message : 'Errore OpenAI')
  }
}
