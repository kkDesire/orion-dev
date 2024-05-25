<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const emits = defineEmits<{
  (e: 'close'): void
}>()

const toast = useToast()

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
})

const state = reactive({
  name: '',
})

type Schema = z.output<typeof schema>
const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true
  try {
    const result = await $fetch('/api/categories', {
      method: 'POST',
      body: event.data,
    })

    if (result) {
      toast.add({
        icon: 'i-heroicons-check-circle',
        title: 'Category created',
        color: 'green',
      })
      emits('close')
    }

    loading.value = false
  }
  catch (e) {
    loading.value = false
    console.error('error', e)
    toast.add({ icon: 'i-heroicons-exclamation-circle', title: 'Error', color: 'red' })
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Nom" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <div class="flex justify-end gap-3">
      <UButton label="Cancel" color="gray" variant="ghost" @click="emits('close')" />
      <UButton :loading="loading" type="submit" label="Save" color="primary" />
    </div>
  </UForm>
</template>

<style></style>
