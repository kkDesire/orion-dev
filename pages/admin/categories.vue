<script lang="ts" setup>
import type { Category } from '~/server/utils/drizzle'

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
    key: 'actions',
  },
]

const isNewCategoryModalOpen = ref<boolean>(false)
const isEditCategoryModalOpen = ref<boolean>(false)
const input = ref<{ input: HTMLInputElement }>()
const selectedColumns = ref(defaultColumns)
const editCategory = ref<Category | null>(null)
const columns = computed(() =>
  defaultColumns.filter(column => selectedColumns.value.includes(column)),
)
const { data: categories, pending, refresh } = await useFetch<Category[]>('/api/categories', {
  deep: false,
  lazy: true,
  default: () => [],
})

async function handleCloseModal() {
  isNewCategoryModalOpen.value = false
  await refresh()
}

async function handleCloseEditModal() {
  isEditCategoryModalOpen.value = false
  editCategory.value = null
  await refresh()
}
function actionsItems(row: Category) {
  return [
    [
      {
        label: 'Edit',
        icon: 'i-heroicons-pencil-square-20-solid',
        click: () => {
          editCategory.value = row
          isEditCategoryModalOpen.value = true
        },
      },
    ],
  ]
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
      <UDashboardNavbar title="Categories" :badge="categories.length">
        <template #right>
          <UButton
            trailing-icon="i-heroicons-plus"
            color="gray"
            label="New category"
            @click="isNewCategoryModalOpen = true"
          />
          <RefreshButton
            :loading="pending"
            @click="refresh"
          />
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
      <UTable :columns="columns" :rows="categories" :loading="pending">
        <template #actions-data="{ row }">
          <UDropdown :items="actionsItems(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>

      <UDashboardModal
        v-model="isNewCategoryModalOpen"
        title="New category"
        description="Add a new category to your database"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <!-- ~/components/users/UsersForm.vue -->
        <CategoriesCreateForm @close="handleCloseModal" />
      </UDashboardModal>
      <UDashboardModal
        v-model="isEditCategoryModalOpen"
        title="Edit category"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <!-- ~/components/users/UsersForm.vue -->
        <CategoriesEditForm v-if="editCategory" :category="editCategory" @close="handleCloseEditModal" />
      </UDashboardModal>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style></style>
