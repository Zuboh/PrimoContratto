declare module 'npm:pdf-parse' {
  function pdfParse(buffer: Uint8Array): Promise<{ text: string }>
  export default pdfParse
}
