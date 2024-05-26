import { requireAdminUser } from '~/server/utils/session'
import { useSlugify } from '~/server/utils/slugify'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const db = useDrizzle()
  const body = await readBody(event)

  // TODO: handle db error (send to client)
  const result = await db.insert(tables.categories).values({
    name: body.name,
    slug: useSlugify(body.name),
  })

  if (!result)
    throw createError({ statusCode: 400, statusMessage: 'Failed to create category' })

  return body
})
