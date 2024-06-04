import { nanoid } from 'nanoid'

export function useHash(): string {
  return nanoid(12)
}
