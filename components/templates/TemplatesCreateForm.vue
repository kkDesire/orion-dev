<script lang="ts" setup>
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { PAID_STATUS } from '~/server/utils/contants'
import 'easymde/dist/easymde.min.css'

const toast = useToast()
const loading = ref<boolean>(false)

const schema = z.object({
  title: z.string({ message: 'Title is required' }),
  categoryId: z.string({ message: 'Category is required', coerce: true }),
  paidStatus: z.enum(PAID_STATUS, { message: 'Paid status is required' }),
  liveUrl: z.string().optional(),
  accessUrl: z.string({ message: 'Access URL is required' }),
  description: z.string({ message: 'Description is required' }),
})

type Schema = z.output<typeof schema>

const state = reactive({
  title: undefined,
  categoryId: undefined,
  paidStatus: undefined,
  liveUrl: undefined,
  accessUrl: undefined,
  description: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  try {
    loading.value = true
    const result = await $fetch('/api/templates', {
      method: 'POST',
      body: event.data,
    })
    if (result) {
      toast.add({
        icon: 'i-heroicons-check-circle',
        title: `Template "${event.data.title}" has been created`,
        color: 'green',
      })
    }
    loading.value = false
  }
  catch (error) {
    loading.value = false
    if (error instanceof Error) {
      toast.add({
        icon: 'i-heroicons-exclamation-circle',
        title: 'Error',
        description: error.message,
        color: 'red',
      })
    }
    console.error(error)
  }
}

const options = [
  {
    value: 'free',
    label: 'Free',
  },
  {
    value: 'paid',
    label: 'Paid',
  },
]
const { data: categories } = await useFetch('/api/categories', {
  deep: false,
  default: () => [],
})

onMounted(async () => {
  const EasyMDE = await import('easymde').then(m => m.default)
  const easyMDE = new EasyMDE()
  easyMDE.codemirror.on('change', () => {
    state.description = easyMDE.value()
  })
})
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormGroup label="Title" name="title" required>
      <UInput v-model="state.title" />
    </UFormGroup>
    <UFormGroup name="paidStatus" required>
      <URadioGroup
        v-model="state.paidStatus"
        legend="Choose paid status"
        :options="options"
        required
      />
    </UFormGroup>
    <UFormGroup label="Category" name="categoryId" required>
      <USelectMenu
        v-model="state.categoryId"
        option-attribute="name"
        value-attribute="id"
        :options="categories"
      />
    </UFormGroup>
    <UFormGroup label="Live Url" name="liveUrl">
      <UInput v-model="state.liveUrl" type="url" />
    </UFormGroup>
    <UFormGroup label="access Url" name="accessUrl" required>
      <UInput v-model="state.accessUrl" type="url" />
    </UFormGroup>
    <UFormGroup label="Description" name="description" required>
      <UTextarea v-model="state.description" />
    </UFormGroup>
    <UFormGroup>
      <UButton :loading="loading" type="submit">
        Submit
      </UButton>
    </UFormGroup>
  </UForm>
</template>
