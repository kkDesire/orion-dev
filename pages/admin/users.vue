<script lang="ts" setup>
import type { User } from '~/server/utils/drizzle'

definePageMeta({
  middleware: ['admin'],
  layout: 'admin',
})
const q = ref('')
const input = ref<{ input: HTMLInputElement }>()
const defaultColumns = [
  {
    key: 'image',
    label: 'Avatar',
  },
  {
    key: 'id',
    label: '#',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'githubId',
    label: 'Github ID',
    sortable: true,
  },
  {
    key: 'login',
    label: 'Login',
  },
  {
    key: 'roleType',
    label: 'Role type',
  },
]
const selectedColumns = ref(defaultColumns)
const columns = computed(() =>
  defaultColumns.filter(column => selectedColumns.value.includes(column)),
)
const { data: users, pending } = await useFetch<User[]>('/api/users', {
  deep: false,
  lazy: true,
  default: () => [],
})

defineShortcuts({
  '/': () => {
    input.value?.input.focus()
  },
})
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="User" :badge="users.length">
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
            <RefreshButton :loading="pending" @click="refresh" />
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
      <UTable :columns="columns" :rows="users" :loading="pending">
        <template #image-data="{ row }">
          <img :src="row.avatarUrl" class="w-10 h-10 rounded-full" :alt="`${row.username} Avatar`">
        </template>
        <template #roleType-data="{ row }">
          <UBadge
            :label="row.roleType"
            :color="row.roleType === 'admin' ? 'blue' : 'primary'"
            variant="subtle"
            class="capitalize"
          />
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
