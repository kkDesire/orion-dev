<script lang="ts" setup>
const { metaSymbol } = useShortcuts()
definePageMeta({
  layout: 'admin',
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
]
const q = ref('')
const isNewCategoryModalOpen = ref<boolean>(false)
const input = ref<{ input: HTMLInputElement }>()
const selectedColumns = ref(defaultColumns)
const columns = computed(() =>
  defaultColumns.filter(column => selectedColumns.value.includes(column)),
)
const { data: categories, pending, refresh } = await useFetch<any>('/api/categories', {
  deep: false,
})

async function handleCloseModal() {
  isNewCategoryModalOpen.value = false
  await refresh()
}

defineShortcuts({
  '/': () => {
    input.value?.input.focus()
  },
  'meta_k': () => {
    isNewCategoryModalOpen.value = true
  },
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Categories">
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
              trailing-icon="i-heroicons-plus"
              color="gray"
              @click="isNewCategoryModalOpen = true"
            >
              <UKbd>{{ `${metaSymbol} + k` }}</UKbd>
              New category
            </UButton>
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
      <UTable :columns="columns" :rows="categories" :loading="pending" />

      <UDashboardModal
        v-model="isNewCategoryModalOpen"
        title="New category"
        description="Add a new category to your database"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <!-- ~/components/users/UsersForm.vue -->
        <CategoriesForm @close="handleCloseModal" />
      </UDashboardModal>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
