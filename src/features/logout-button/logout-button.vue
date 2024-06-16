<script setup lang="ts">
import { useAuthStore } from '~/shared/stores/auth-store';

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  navigateTo('/login');
};
</script>

<template>
  <UButton
    class="justify-center"
    icon="i-heroicons-arrow-left-end-on-rectangle-solid"
    @click="handleLogout"
  >
    {{ $t('logout') }}
  </UButton>
</template>
