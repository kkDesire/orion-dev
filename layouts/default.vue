<script setup lang="ts">
const { user, loggedIn, clear } = useUserSession()

const socials = [{
  title: 'X',
  icon: 'i-simple-icons-x',
  to: 'https://x.com/KouamDesire07',
  target: '_blank',
}, {
  title: 'GitHub',
  icon: 'grommet-icons:github',
  to: 'https://github.com/kkDesire',
  target: '_blank',
}]

const items = [[{
  label: 'Profile',
  icon: 'i-heroicons-user',
  to: '/profile',
}], [{
  label: 'Sign out',
  icon: 'i-heroicons-arrow-right-on-rectangle',
  click: async () => {
    await clear()
    navigateTo('/templates')
  },
}]]

if (user.value?.roleType === 'admin') {
  // @ts-expect-error No types for this yet
  items[0].push({
    label: 'Admin',
    icon: 'i-heroicons-shield-check',
    to: '/admin',
  })
}
</script>

<template>
  <div>
    <UHeader
      title="Orion"
      to="/templates"
    >
      <template #right>
        <UButton
          v-for="social in socials"
          :key="social.title"
          v-bind="social"
          square
          variant="ghost"
          color="gray"
        />
        <UColorModeButton />
        <UButton
          v-if="!loggedIn"
          to="/auth/github"
          external
          color="black"
        >
          Submit a template
        </UButton>
        <UDropdown
          v-else-if="user"
          :items="items"
        >
          <template #default="{ open }">
            <UButton
              variant="ghost"
              color="gray"
              :class="[open && 'bg-gray-50 dark:bg-gray-800']"
            >
              <template #leading>
                <UAvatar
                  :src="user.avatarUrl"
                  size="2xs"
                />
              </template>
              {{ user.name ?? user.login }}
            </UButton>
          </template>
        </UDropdown>
      </template>
    </UHeader>
    <UMain>
      <slot />
    </UMain>

    <UFooter
      class="py-12"
      :ui="{ bottom: { wrapper: 'flex flex-col lg:flex-row', container: 'flex flex-col lg:flex-row lg:items-start', left: 'mt-0', right: 'mt-12 order-3 lg:mt-0 flex flex-col justify-center lg:items-end lg:justify-start gap-2', center: 'mt-0' } }"
    >
      <template #left>
        <div class="flex flex-col gap-2">
          <p class="font-bold">
            Orion
          </p>
          <p class="italic opacity-60 text-sm max-w-sm">
            <em>
              Discover, search, find and learn for a collection of templates built by the community for the Nuxt ecosystem.
            </em>
          </p>
        </div>
      </template>
      <template #right>
        <div class="flex flex-row gap-.5">
          <UButton
            v-for="social in socials"
            :key="social.title"
            v-bind="social"
            square
            variant="ghost"
            color="gray"
          />
        </div>
        <p class="italic text-sm opacity-60 text-right">
          Built by <a
            href="https://github.com/KKDesire"
            target="_blank"
          >Désiré (KKDesire) K</a>
        </p>
      </template>
    </UFooter>
  </div>
</template>
