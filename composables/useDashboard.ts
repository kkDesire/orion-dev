import { createSharedComposable } from '@vueuse/core'

function _useDashboard() {
  const route = useRoute()
  const router = useRouter()
  const isHelpSlideoverOpen = ref(false)
  const isNotificationsSlideoverOpen = ref(false)

  defineShortcuts({
    'g-a': () => router.push('/admin'),
    'g-c': () => router.push('/admin/categories'),
    'g-u': () => router.push('/admin/users'),
    'g-m': () => router.push('/admin/modules'),
    '?': () => isHelpSlideoverOpen.value = true,
  })

  watch(() => route.fullPath, () => {
    isHelpSlideoverOpen.value = false
    isNotificationsSlideoverOpen.value = false
  })

  return {
    isHelpSlideoverOpen,
    isNotificationsSlideoverOpen,
  }
}

export const useDashboard = createSharedComposable(_useDashboard)
