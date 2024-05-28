<script lang="ts" setup>
import type { Module } from '~/server/utils/drizzle'

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const defaultColumns = [
  {
    key: 'id',
    label: '#',
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'icon',
    label: 'Icon',
  },
  {
    key: 'repo',
    label: 'Repo',
  },
  {
    key: 'type',
    label: 'Type',
  },
]
const selectedColumns = ref(defaultColumns)
const columns = computed(() =>
  defaultColumns.filter(column => selectedColumns.value.includes(column)),
)

const q = ref('')
const fetch_module_loading = ref<boolean>(false)
const input = ref<{ input: HTMLInputElement }>()
const toast = useToast()

const { data: modules, pending, refresh } = await useFetch<Module[]>(
  '/api/modules/fetch',
  {
    deep: false,
    lazy: true,
    default: () => [],
  },
)

async function fetchModules() {
  fetch_module_loading.value = true
  try {
    await $fetch('/api/modules/fetch', {
      method: 'POST',
    })

    toast.add({
      icon: 'i-heroicons-check-circle',
      title: 'Modules has been fetched',
      color: 'green',
    })
    fetch_module_loading.value = false

    await refresh()
  }
  catch (e) {
    fetch_module_loading.value = false
    if (e instanceof Error) {
      toast.add({
        icon: 'i-heroicons-exclamation-circle',
        title: 'Error',
        description: e.message,
        color: 'red',
      })
    }
  }
}
defineShortcuts({
  '/': () => {
    input.value?.input.focus()
  },
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Modules" :badge="modules.length">
        <template #left>
          <div>
            <UButton
              trailing-icon="i-heroicons-arrow-path"
              color="gray"
              label="Refresh"
              @click="refresh"
            />
          </div>
        </template>
        <template #right>
          <div class="flex gap-3">
            <UInput
              ref="input"
              v-model="q"
              icon="i-heroicons-funnel"
              autocomplete="off"
              placeholder="Filter users..."
              class="hidden lg:block"
              @keydown.esc="$event.target.blur()"
            >
              <template #trailing>
                <UKbd value="/" />
              </template>
            </UInput>
            <UButton
              :loading="fetch_module_loading"
              trailing-icon="i-heroicons-server-stack"
              color="gray"
              label="Fetch modules"
              @click="fetchModules"
            />
          </div>
        </template>
      </UDashboardNavbar>
      <UDashboardToolbar>
        <template #right>
          <USelectMenu
            v-model="selectedColumns"
            icon="i-heroicons-adjustments-horizontal-solid"
            :options="defaultColumns"
            multiple
            class="hidden lg:block"
          >
            <template #label>
              Display
            </template>
          </USelectMenu>
        </template>
      </UDashboardToolbar>
      <UTable :columns="columns" :rows="modules" :loading="pending">
        <template #image-data="{ row }">
          <img
            :src="row.avatarUrl"
            class="w-10 h-10 rounded-full"
            :alt="`${row.username} Avatar`"
          >
        </template>
        <template #type-data="{ row }">
          <UBadge
            :label="row.type"
            :color="row.type === 'official' ? 'green' : 'blue'"
            variant="subtle"
            class="capitalize"
          />
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
