import { UPLOAD } from '@/constants/config'
import * as Crypto from 'expo-crypto'

import * as FileSystem from 'expo-file-system/legacy'

/**
 * Genera un hash SHA-256 dal base64 del PDF
 * Usato per il caching — stesso PDF = stesso hash = non rianalizzare
 */
export async function generatePdfHash(base64: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    base64,
  )
}
/**
 * Converte un file URI in base64
 */

export async function uriToBase64(uri: string): Promise<string> {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  })
  return base64
}

/**
 * Controlla se un file è un PDF valido dal suo URI
 */
export function isPdf(uri: string): boolean {
  return uri.toLowerCase().endsWith('.pdf')
}

/**
 * Controlla se un file supera la dimensione massima
 * @param sizeBytes dimensione in bytes
 * @param maxMb dimensione massima in MB (default 10)
 */
export function isFileTooLarge(base64: string): boolean {
  return base64.length > UPLOAD.maxBase64Length
}
