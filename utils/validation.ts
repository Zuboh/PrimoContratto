/**
 * Controlla se una email è valida
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * Controlla se una stringa è vuota o solo spazi
 */
export function isEmpty(value: string): boolean {
  return !value || value.trim().length === 0
}
