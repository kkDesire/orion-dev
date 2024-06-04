<script lang="ts" setup>
const { isHelpSlideoverOpen } = useDashboard()
const links = [
  {
    id: 'admin',
    label: 'Admin',
    icon: 'i-heroicons-home',
    to: '/admin',
    tooltip: {
      text: 'Admin',
      shortcuts: ['G', 'A'],
    },
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: 'i-heroicons-tag',
    to: '/admin/categories',
    tooltip: {
      text: 'Categories',
      shortcuts: ['G', 'C'],
    },
  },
  {
    id: 'modules',
    label: 'Modules',
    icon: 'i-heroicons-archive-box',
    to: '/admin/modules',
    tooltip: {
      text: 'Modules',
      shortcuts: ['G', 'M'],
    },
  },
  {
    id: 'templates',
    label: 'Templates',
    icon: 'i-heroicons-rectangle-group',
    to: '/admin/templates',
    tooltip: {
      text: 'Templates',
      shortcuts: ['G', 'T'],
    },
  },
  {
    id: 'users',
    label: 'Users',
    icon: 'i-heroicons-user-group',
    to: '/admin/users',
    tooltip: {
      text: 'Users',
      shortcuts: ['G', 'U'],
    },
  },
]

const footerLinks = [
  {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => (isHelpSlideoverOpen.value = true),
  },
]

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.map(link => ({ ...link, shortcuts: link.tooltip?.shortcuts })),
  },
]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <NuxtLink to="/">
            Orion
          </NuxtLink>
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />
        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>
    <slot />
    <HelpSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
