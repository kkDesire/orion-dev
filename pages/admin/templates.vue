<script setup lang="ts">
import type { Template } from '~/server/utils/drizzle'

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
    key: 'title',
    label: 'Title',
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
  },
  {
    key: 'paidStatus',
    label: 'Paid status',
    sortable: true,
  },
  {
    key: 'liveUrl',
    label: 'Live Url',
  },
  {
    key: 'accessUrl',
    label: 'Access Url',
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'category.name',
    label: 'Category',
  },
  {
    key: 'createdBy',
    label: 'Created by',
  },
]
const selectedColumns = ref(defaultColumns)
const columns = computed(() =>
  defaultColumns.filter(column => selectedColumns.value.includes(column)),
)

const { data: templates, pending, refresh } = await useFetch(
  '/api/templates',
  {
    deep: false,
    lazy: true,
    default: () => [],
    // transform: (data) => {
    //   return data.map((template: any) => {
    //     return {
    //       ...template.templates,
    //       user: template.users,
    //       category: template.categories,
    //     }
    //   })
    // },
  },
)

useSeoMeta({
  title: 'Templates',
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Templates" :badge="templates.length">
        <template #right>
          <UButton trailing-icon="i-heroicons-plus" color="gray" label="New template" />
          <RefreshButton :loading="pending" @click="refresh" />
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
      <UTable :columns="columns" :rows="templates" :loading="pending">
        <template #paidStatus-data="{ row }">
          <UBadge
            :color="row.paidStatus === 'free' ? 'green' : 'yellow'"
            variant="subtle"
          >
            {{ row.paidStatus }}
          </UBadge>
        </template>
        <template #createdBy-data="{ row }">
          <div class="flex flex-row items-center gap-2">
            <img
              :src="row.user.avatarUrl"
              class="w-6 h-6 rounded-full"
              :alt="`${row.user.login} Avatar`"
            >
            <span>{{ row.user.name ?? row.user.login }}</span>
          </div>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped></style>
