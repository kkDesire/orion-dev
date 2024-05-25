import slugify from 'slugify'

/**
 * Slugifies a given text by converting it into a URL-friendly format.
 *
 * @param {string} text - The text to be slugified.
 * @return {string} The slugified version of the given text.
 */
export function useSlugify(text: string): string {
  return slugify(text, { lower: true, strict: true })
}
