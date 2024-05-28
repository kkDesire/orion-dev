<script setup lang="ts">
const { user } = useUserSession()
</script>

<template>
  <div>
    <UDashboardNavbar title="Orion">
      <template #right>
        <div class="flex gap-3">
          <UColorModeButton />
          <UButton v-if="user && user.roleType === 'admin'" class="font-bold" label="Orion Admin" color="black" variant="solid" to="/admin/users" />
          <UserDropdown v-if="user" />
        </div>
      </template>
    </UDashboardNavbar>
    <slot />
  </div>
</template>
