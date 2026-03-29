import { error, json } from '../lib/cors.ts'
import { callOpenAI } from '../lib/openai.ts'
import { ANALYZE_SYSTEM_PROMPT } from '../prompts/analize.ts'
import { extractTextFromPdf } from '../utils/pdf.ts'

export async function handleAnalyze(body: unknown): Promise<Response> {
  const { base64, type } = body as { base64: string; type: 'pdf' | 'image' }

  try {
    let messages

    if (type === 'image') {
      messages = [
        { role: 'system' as const, content: ANALYZE_SYSTEM_PROMPT },
        {
          role: 'user' as const,
          content: [
            {
              type: 'image_url' as const,
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
                detail: 'low' as const,
              },
            },
            {
              type: 'text' as const,
              text: 'Analizza questo documento di lavoro italiano.',
            },
          ],
        },
      ]
    } else {
      // Estrai testo dal PDF
      const text = await extractTextFromPdf(base64)
      console.log('Testo estratto, lunghezza:', text.length)

      if (text.trim().length > 100) {
        // PDF con testo → manda testo puro
        const truncated = text.slice(0, 15_000)
        console.log('PDF testuale — uso testo puro')
        messages = [
          { role: 'system' as const, content: ANALYZE_SYSTEM_PROMPT },
          {
            role: 'user' as const,
            content: `Analizza questo documento di lavoro italiano:\n\n${truncated}`,
          },
        ]
      } else {
        // PDF scansionato → fallback base64 troncato
        console.log('PDF scansionato — uso fallback vision')
        const truncated = base64.slice(0, 50_000)
        messages = [
          { role: 'system' as const, content: ANALYZE_SYSTEM_PROMPT },
          {
            role: 'user' as const,
            content: `Analizza questo documento di lavoro italiano in formato base64:\n\n${truncated}`,
          },
        ]
      }
    }

    const result = await callOpenAI(messages, 2000)
    return json({ result })
  } catch (e) {
    console.error('Errore:', e instanceof Error ? e.message : e)
    return error(500, e instanceof Error ? e.message : 'Errore OpenAI')
  }
}
