import { z } from 'zod'
import sanitizeHtml from 'sanitize-html'
import { useHash } from '~/server/utils/hash'
import { PAID_STATUS } from '~/utils/constants'
import { TEMPLATE_MAX_DESCRIPTION_LENGTH, TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH } from '~/utils/templates'

export default defineEventHandler(async (event) => {
  const db = useDrizzle()
  const { user } = await requireUserSession(event)

  const body = await readValidatedBody(event, z.object({
    title: z.string().min(1, 'Name is required'),
    paidStatus: z.enum(PAID_STATUS),
    liveUrl: z.string().optional(),
    accessUrl: z.string(),
    shortDescription: z.string().max(TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH),
    description: z.string().max(TEMPLATE_MAX_DESCRIPTION_LENGTH),
    categoryId: z.number(),
  }).parse)

  await db.insert(tables.templates).values({
    hash: useHash(),
    slug: useSlugify(body.title),
    title: body.title,
    paidStatus: body.paidStatus,
    liveUrl: body.liveUrl,
    accessUrl: body.accessUrl,
    shortDescription: body.shortDescription,
    description: body.description ? sanitizeHtml(body.description) : null,
    categoryId: body.categoryId,
    userId: user.id,
  }).returning({
    id: tables.templates.id,
  })
  return sendNoContent(event, 201)
})
