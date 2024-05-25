import { useSlugify } from '~/server/utils/slugify'

export default defineEventHandler(async (event) => {
  const db = useDrizzle()

  const body = await readBody(event)

  // TODO: handle db error (send to client)
  await db.insert(tables.categories).values({
    name: body.name,
    slug: useSlugify(body.name),
  })

  return body
})
