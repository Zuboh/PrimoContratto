declare module 'npm:unpdf' {
  interface UnpdfResult {
    text: string
    totalPages: number
  }
  export function extractText(
    buffer: Uint8Array,
    options?: { mergePages?: boolean },
  ): Promise<UnpdfResult>
}
