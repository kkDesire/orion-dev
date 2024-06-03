import { z } from 'zod'
import { useHash } from '~/server/utils/hash'

export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const { user } = await requireUserSession(event)

  const body = await readValidatedBody(event, z.object({
    title: z.string().min(1, 'Name is required'),
    paidStatus: z.enum(['free', 'paid']),
    liveUrl: z.string().optional(),
    accessUrl: z.string(),
    description: z.string(),
    categoryId: z.number(),
  }).parse)

  const result = await db.insert(tables.templates).values({
    hash: useHash(),
    slug: useSlugify(body.title),
    title: body.title,
    paidStatus: body.paidStatus,
    liveUrl: body.liveUrl,
    accessUrl: body.accessUrl,
    description: body.description,
    categoryId: body.categoryId,
    userId: user.id,
  })
  return result
})
