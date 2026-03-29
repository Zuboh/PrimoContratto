import { extractText } from 'npm:unpdf'

export async function extractTextFromPdf(base64: string): Promise<string> {
  try {
    const buffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
    const { text } = await extractText(buffer, { mergePages: true })
    return text ?? ''
  } catch (e) {
    console.error('Errore estrazione testo PDF:', e)
    return ''
  }
}

export function isPdfScanned(text: string): boolean {
  return text.trim().length < 100
}

export function truncateText(text: string, maxChars = 15_000): string {
  return text.slice(0, maxChars)
}
