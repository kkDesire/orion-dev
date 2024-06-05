<script setup lang="ts">
const route = useRoute()

const hash = computed(() => route.params.slug.slice(-12))

const { data: template } = await useFetch(`/api/templates/${hash.value}`, {
  deep: false,
  default: () => {},
})
</script>

<template>
  <article v-if="template" class="prose dark:prose-invert">
    <h1>{{ template.title }}</h1>
    <ClientOnly>
      <p v-html="template.description" />
    </ClientOnly>
  </article>
</template>

<style scoped>

</style>
