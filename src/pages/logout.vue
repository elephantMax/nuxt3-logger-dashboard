<template>
  <span>
    logging out...
  </span>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/shared/stores/auth-store';

definePageMeta({
  layout: 'empty',
  middleware: [
    async function () {
      const authStore = useAuthStore();

      await authStore.logout();

      return navigateTo('/login', { redirectCode: 301 });
    },
  ],
  name: 'logout',
});
</script>
