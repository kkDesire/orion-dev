import { z } from 'zod'

export const createTemplateValidator = z.object({
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
})
