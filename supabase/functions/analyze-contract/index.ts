import { handleAnalyze } from './handlers/analyze.ts'
import { handleNegotiate } from './handlers/negotiate.ts'
import { corsHeaders, error } from './lib/cors.ts'

Deno.serve(async (req) => {
  console.log('Richiesta ricevuta:', req.method, req.url)

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const action = body?.action ?? 'analyze'

    console.log('Action:', action)

    switch (action) {
      case 'analyze':
        return await handleAnalyze(body)
      case 'negotiate':
        return await handleNegotiate(body)
      default:
        return error(400, `Action non valida: ${action}`)
    }
  } catch (err) {
    console.error('Errore generale:', err instanceof Error ? err.message : err)
    return error(500, err instanceof Error ? err.message : 'Errore interno')
  }
})
