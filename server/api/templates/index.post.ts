import sanitizeHtml from 'sanitize-html'
import { z } from 'zod'
import { useHash } from '~/server/utils/hash'
import { PAID_STATUS, TEMPLATE_MAX_DESCRIPTION_LENGTH, TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const db = useDrizzle()

  const body = await readValidatedBody(event, z.object({
    title: z.string({ message: 'Required' }),
    paidStatus: z.enum(PAID_STATUS, { message: 'Required' }),
    categoryId: z.number({ message: 'Required', coerce: true }),
    moduleIds: z.array(z.number({ coerce: true })).max(6, { message: `Max 6 modules` }).optional(),
    liveUrl: z.string().url().optional(),
    accessUrl: z.string({ message: 'Required' }).url(),
    shortDescription: z.string({ message: 'Required' }).max(TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH, { message: `Max ${TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH} characters` }),
    description: z.string().max(TEMPLATE_MAX_DESCRIPTION_LENGTH, {
      message: `Max ${TEMPLATE_MAX_DESCRIPTION_LENGTH} characters`,
    }).optional(),
  }).parse)

  const [template] = await db.insert(tables.templates).values({
    hash: useHash(),
    slug: useSlugify(body.title),
    title: body.title,
    paidStatus: body.paidStatus,
    liveUrl: body.liveUrl,
    accessUrl: body.accessUrl,
    shortDescription: body.shortDescription,
    description: body.description ? sanitizeHtml(body.description) : null,
    categoryId: body.categoryId,
    creatorId: user.id,
  }).returning({
    id: tables.templates.id,
  })

  if (body.moduleIds?.length) {
    console.log('enterd module ids')
    // TODO: Check if this is the better way to do it
    await db.insert(tables.modulesToTemplates).values(body.moduleIds.map(id => ({ moduleId: id, templateId: template.id }))).execute()
  }
  return sendNoContent(event, 201)
})
