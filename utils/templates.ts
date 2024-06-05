export const TEMPLATE_MAX_DESCRIPTION_LENGTH = 2000
export const TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH = 120
export const CATEGORY_MAX_NAME_LENGTH = 20

export const paidStatusOptions: { value: typeof PAID_STATUS[number], label: string }[] = [{
  value: 'free',
  label: 'Free',
}, {
  value: 'freemium',
  label: 'Freemium',
}, {
  value: 'premium',
  label: 'Premium',
}]
