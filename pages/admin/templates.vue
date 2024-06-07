<script setup lang="ts">
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
    key: 'shortDescription',
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
      <UDashboardNavbar
        title="Templates"
        :badge="templates.length"
      >
        <template #right>
          <UButton
            trailing-icon="i-heroicons-plus"
            color="gray"
            label="New template"
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
      <UTable
        :columns="columns"
        :rows="templates"
        :loading="pending"
      >
        <template #liveUrl-data="{ row }">
          <UButton
            v-if="row.liveUrl"
            variant="link"
            target="_blank"
            :to="row.liveUrl"
            class="flex flex-row items-center gap-1"
          >
            <span>{{ row.liveUrl }}</span>

            <span class="i-heroicons-arrow-top-right-on-square-16-solid inline-block w-4 h-4" />
          </UButton>
          <span v-else> - </span>
        </template>
        <template #accessUrl-data="{ row }">
          <UButton
            variant="link"
            target="_blank"
            :to="row.accessUrl"
            class="flex flex-row items-center gap-1"
          >
            <span>{{ row.accessUrl }}</span>

            <span class="i-heroicons-arrow-top-right-on-square-16-solid inline-block w-4 h-4" />
          </UButton>
        </template>
        <template #paidStatus-data="{ row }">
          <UBadge
            :color="row.paidStatus === 'free'
              ? 'green'
              : row.paidStatus === 'freemium'
                ? 'blue'
                : 'yellow'"
            variant="subtle"
          >
            {{ row.paidStatus }}
          </UBadge>
        </template>
        <template #createdBy-data="{ row }">
          <div class="flex flex-row items-center gap-2">
            <img
              :src="row.creator.avatarUrl"
              class="w-6 h-6 rounded-full"
              :alt="`${row.creator.login} Avatar`"
            >
            <span>{{ row.creator.name ?? row.creator.login }}</span>
          </div>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped></style>
