export function validateAnalyzeRequest(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Body mancante'

  const { base64, type } = body as Record<string, unknown>

  if (!base64 || typeof base64 !== 'string')
    return 'base64 mancante o non valido'
  if (!type || !['pdf', 'image'].includes(type as string))
    return 'type deve essere pdf o image'
  if (base64.length < 100) return 'base64 troppo corto — file non valido'

  return null
}

export function validateNegotiateRequest(body: unknown): string | null {
  if (!body || typeof body !== 'object') return 'Body mancante'

  const { analysisJson } = body as Record<string, unknown>

  if (!analysisJson || typeof analysisJson !== 'string')
    return 'analysisJson mancante'

  try {
    JSON.parse(analysisJson)
  } catch {
    return 'analysisJson non è un JSON valido'
  }

  return null
}
