import { z } from 'zod'
import { eq } from 'drizzle-orm'
import { requireAdminUser } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)
  const db = useDrizzle()
  const body = await readValidatedBody(event, z.object({
    name: z.string().min(1, 'Name is required'),
  }).parse)
  const params = await getValidatedRouterParams(event, z.object({ id: z.number({ coerce: true }).positive().int('ID must be a positive integer') }).parse)

  const result = await db.update(tables.categories).set({
    name: body.name,
    slug: useSlugify(body.name),
  }).where(eq(tables.categories.id, params.id))

  if (!result)
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })

  return body
  // return sendNoContent(event, 200)
})
