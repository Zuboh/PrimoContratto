import { error, json } from '../lib/cors.ts'
import { callOpenAI } from '../lib/openai.ts'
import { validateNegotiateRequest } from '../lib/validate.ts'
import { buildNegotiationPrompt } from '../prompts/negotiate.ts'
import { NegotiationResult } from '../types.ts'

export async function handleNegotiate(body: unknown): Promise<Response> {
  console.log('handleNegotiate: inizio')

  const validationError = validateNegotiateRequest(body)
  if (validationError) {
    console.error('Validazione fallita:', validationError)
    return error(400, validationError)
  }

  const { analysisJson } = body as { analysisJson: string }

  try {
    const result = (await callOpenAI(
      [
        {
          role: 'user',
          content: buildNegotiationPrompt(analysisJson),
        },
      ],
      1500,
    )) as NegotiationResult

    console.log('Negoziazione ok, punti:', result.points?.length)
    return json({ result })
  } catch (e) {
    console.error(
      'Errore OpenAI negotiate:',
      e instanceof Error ? e.message : e,
    )
    return error(500, e instanceof Error ? e.message : 'Errore OpenAI')
  }
}
