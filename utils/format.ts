/**
 * Formatta una data ISO in formato italiano
 * @example formatDate('2026-02-24') → '24 feb 2026'
 */
export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Formatta una data relativa
 * @example formatRelativeDate('2026-02-24') → 'Ieri' | '3 giorni fa' | '24 feb 2026'
 */
export function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Oggi'
  if (diffDays === 1) return 'Ieri'
  if (diffDays < 7) return `${diffDays} giorni fa`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} settimane fa`
  return formatDate(isoString)
}

/**
 * Tronca un testo lungo con ellipsis
 * @example truncate('Contratto ABC S.r.l.', 15) → 'Contratto ABC S...'
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Capitalizza la prima lettera
 * @example capitalize('tempo determinato') → 'Tempo determinato'
 */
export function capitalize(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Formatta dimensione file in KB/MB
 * @example formatFileSize(1048576) → '1.0 MB'
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
