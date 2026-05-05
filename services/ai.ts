import { AnalysisResult, NegotiationResult } from '@/types'

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

export async function analyzeContract(
  base64: string,
  type: 'pdf' | 'image',
): Promise<AnalysisResult> {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/analyze-contract`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ base64, type, action: 'analyze' }),
    }
  )

  if (!response.ok) throw new Error(`Errore: ${response.status}`)

  const { result, error } = await response.json()
  if (error) throw new Error(error)

  return result as AnalysisResult
}

export async function negotiateContract(
  analysisJson: string,
): Promise<NegotiationResult> {
  const response = await fetch(
    `${SUPABASE_URL}/functions/v1/analyze-contract`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action: 'negotiate', analysisJson }),
    },
  )

  if (!response.ok) throw new Error(`Errore: ${response.status}`)

  const { result, error } = await response.json()
  if (error) throw new Error(error)

  return result as NegotiationResult
}
