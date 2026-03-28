interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string | ContentBlock[]
}

interface ContentBlock {
  type: 'text' | 'image_url'
  text?: string
  image_url?: {
    url: string
    detail: 'low' | 'high' | 'auto'
  }
}

export async function callOpenAI(
  messages: Message[],
  maxTokens = 2000,
): Promise<unknown> {
  const key = Deno.env.get('OPENAI_API_KEY')

  if (!key) {
    console.error('OPENAI_API_KEY non trovata nelle secrets!')
    throw new Error('OPENAI_API_KEY non configurata')
  }

  console.log(
    'Chiamando OpenAI con',
    messages.length,
    'messaggi, max_tokens:',
    maxTokens,
  )

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: maxTokens,
      messages,
      response_format: { type: 'json_object' },
    }),
  })

  console.log('OpenAI status:', res.status)

  if (!res.ok) {
    const text = await res.text()
    console.error('OpenAI errore body:', text)
    throw new Error(`OpenAI ${res.status}: ${text}`)
  }

  const data = await res.json()
  const content = data.choices[0]?.message?.content

  if (!content) {
    console.error('OpenAI risposta vuota:', JSON.stringify(data))
    throw new Error('Risposta OpenAI vuota')
  }

  console.log('OpenAI content length:', content.length)

  try {
    return JSON.parse(content)
  } catch (e) {
    console.error('Errore parsing JSON:', content)
    throw new Error('Risposta OpenAI non è JSON valido')
  }
}
