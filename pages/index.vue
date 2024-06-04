<script setup>
// const { loggedIn, user, clear } = useUserSession()
</script>

<template>
  <div>
    <ULandingHero>
      <template #title>
        Quickly start <br>
        your <span class="dark:text-[#00dc82]">Nuxt</span> project
      </template>
      <template #description>
        A community-driven collection of template for your next project, <br>from
        landing page to complete web application.
      </template>
    </ULandingHero>
    <UPage class="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <template #left>
        <div class="mt-8 flex flex-col gap-4">
          <div class="h-8 flex flex-row items-center justify-between">
            <span class="font-semibold">Filter</span>
          </div>
        </div>
      </template>
    </UPage>
  </div>
</template>
