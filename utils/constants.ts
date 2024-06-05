export const PAID_STATUS = ['free', 'premium', 'freemium'] as const
export const ROLE_TYPE = ['admin', 'creator'] as const
export const STATUS = ['submitted', 'refused', 'validate'] as const
// https://raw.githubusercontent.com/nuxt/modules/main/icons
export const MODULE_ICON_PREFIX = 'https://ipx.nuxt.com/s_80,f_auto/gh/nuxt/modules/main/icons'
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
}] as const
