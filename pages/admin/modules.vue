<script lang="ts" setup>
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
    key: 'slug',
    label: 'Slug',
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
const input = ref<{ input: HTMLInputElement }>()
const modules = ref<any[]>([])
const pending = ref<boolean>(false)

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
      <UTable :columns="columns" :rows="modules" :loading="pending" />
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped></style>
