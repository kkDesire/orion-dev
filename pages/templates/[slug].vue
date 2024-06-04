<script setup lang="ts">
const route = useRoute()

const hash = computed(() => route.params.slug.slice(-12))

const { data: template } = await useFetch(`/api/templates/${hash.value}`, {
  deep: false,
  default: () => {},
})
</script>

<template>
  <pre>{{ template }}</pre>
</template>

<style scoped>

</style>
