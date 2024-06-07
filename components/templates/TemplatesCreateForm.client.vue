<script lang="ts" setup>
import type { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import 'quill/dist/quill.snow.css'
import '~/assets/css/quill.css'
import type { Module } from '~/server/utils/drizzle'

const toast = useToast()
const loading = ref<boolean>(false)

type Schema = z.output<typeof createTemplateValidator>
const form = ref()

const state = reactive<{
  title: string | undefined
  paidStatus: typeof PAID_STATUS[number] | undefined
  categoryId: string | undefined
  moduleIds: number[] | undefined
  liveUrl: string | undefined
  accessUrl: string | undefined
  shortDescription: string
  description: string
}>({
  title: undefined,
  categoryId: undefined,
  paidStatus: undefined,
  liveUrl: undefined,
  accessUrl: undefined,
  moduleIds: [],
  shortDescription: '',
  description: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  try {
    loading.value = true
    await $fetch('/api/templates', {
      method: 'POST',
      body: event.data,
    })
    toast.add({
      icon: 'i-heroicons-check-circle',
      title: `Template "${event.data.title}" has been created`,
      color: 'green',
    })
    loading.value = false
    state.title = undefined
    state.categoryId = undefined
    state.moduleIds = []
    state.liveUrl = undefined
    state.accessUrl = undefined
    state.paidStatus = undefined
    state.shortDescription = ''
    state.description = ''
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

const isPremium = computed(() => state.paidStatus === 'premium')

const { data: modules } = await useFetch<Module[]>('/api/modules', {
  deep: false,
  default: () => [],
  transform: (data) => {
    /**
     * Order by name nd then by type (community or official)
     */
    return data.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.type.localeCompare(a.type))
  },
})
const { data: categories } = await useFetch('/api/categories', {
  deep: false,
  default: () => [],
})
const quill = useQuill()

async function onReset() {
  form.value.clear()
  state.description = ''
  state.categoryId = undefined
  if (quill.value)
    quill.value.setText('')
}

watch(quill, () => {
  quill.value?.on('text-change', (_: undefined, __: undefined, source: string) => {
    if (source === 'api') return
    state.description = quill.value?.root.innerHTML ?? ''
    form.value.validate('description', { silent: true })
  })
})
</script>

<template>
  <UForm
    ref="form"
    class="flex flex-col gap-8"
    :schema="createTemplateValidator"
    :state="state"
    @submit="onSubmit"
  >
    <UFormGroup
      label="Title"
      name="title"
      required
    >
      <UInput
        v-model="state.title"
        type="text"
        placeholder="My Nuxt Template"
      />
    </UFormGroup>
    <UFormGroup
      label="Paid Status"
      name="paidStatus"
      help="A freemium template is free but has premium features. A premium template is paid."
      required
    >
      <URadioGroup
        v-model="state.paidStatus"
        :ui="{ fieldset: 'flex flex-row gap-4' }"
        :options="paidStatusOptions"
        required
      />
    </UFormGroup>
    <div class="contents md:grid md:grid-cols-2 md:gap-8">
      <UFormGroup
        label="Category"
        name="categoryId"
        required
      >
        <USelectMenu
          v-model="state.categoryId"
          option-attribute="name"
          value-attribute="id"
          :options="categories"
          placeholder="-- Select a category --"
        />
      </UFormGroup>
      <UFormGroup
        label="Modules"
        name="moduleId"
      >
        <USelectMenu
          v-model="state.moduleIds"
          option-attribute="name"
          value-attribute="id"
          multiple
          :options="modules"
          placeholder="-- Select one or multiple modules --"
        >
          <template #option="{ option }">
            <img
              v-if="option.icon"
              :src="`${MODULE_ICON_PREFIX}/${option.icon}`"
              class="h-4 w-auto"
            >
            <span
              v-else
              class="i-heroicons-photo inline-block h-4 w-4"
            />
            <span>{{ option.name }}</span>
          </template>
        </USelectMenu>
      </UFormGroup>
    </div>
    <div class="contents md:grid md:grid-cols-2 md:gap-8">
      <UFormGroup
        label="Live Url"
        name="liveUrl"
        help="A URL where user can see the template in action."
      >
        <UInput
          v-model="state.liveUrl"
          type="url"
          placeholder="https://example.com/preview"
        />
      </UFormGroup>
      <UFormGroup
        :label="isPremium ? 'Purchase URL' : 'Public Repo URL'"
        name="accessUrl"
        help="A URL where user can access the template."
        required
      >
        <UInput
          v-model="state.accessUrl"
          type="url"
          :placeholder="
            isPremium
              ? 'https://stripe.com/me/template'
              : 'https://github.com/KKDesire/orion-dev'
          "
        />
      </UFormGroup>
    </div>

    <UFormGroup
      label="Short Description"
      name="shortDescription"
      :hint="`${
        state.shortDescription?.length || 0
      }/${TEMPLATE_MAX_SHORT_DESCRIPTION_LENGTH} characters`"
      help="A short description for SEO and list page."
      required
    >
      <UTextarea
        v-model="state.shortDescription"
        placeholder="Concisely describe your template..."
        :rows="5"
      />
    </UFormGroup>
    <UFormGroup
      label="Description"
      name="description"
      :hint="`${state.description?.length || 0}/${TEMPLATE_MAX_DESCRIPTION_LENGTH} characters`"
    >
      <div id="editor" />
    </UFormGroup>
    <div class="flex flex-row justify-end gap-4">
      <UButton
        variant="ghost"
        color="gray"
        type="reset"
        @click="onReset()"
      >
        Reset
      </UButton>
      <UButton
        :loading="loading"
        type="submit"
      >
        Submit
      </UButton>
    </div>
  </UForm>
</template>
