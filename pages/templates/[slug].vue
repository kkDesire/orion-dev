<script setup lang="ts">
import type { Template } from '~/server/utils/drizzle'

const route = useRoute()

const hash = computed(() => route.params.slug.slice(-12))

const { data: template } = await useFetch<Template>(`/api/templates/${hash.value}`, {
  deep: false,
})
</script>

<template>
  <article
    v-if="template"
    class="prose dark:prose-invert"
  >
    <h1>{{ template.title }}</h1>
    <ClientOnly>
      <p v-html="template.description" />
    </ClientOnly>
  </article>
</template>

<style scoped>

</style>
