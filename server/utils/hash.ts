import { customAlphabet, urlAlphabet } from 'nanoid'

/***
 * We replace the "-" character with an empty string to easily split the URL.
 */
const nanoid = customAlphabet(urlAlphabet.replace('-', ''))
export function useHash() {
  return nanoid(12)
}
