import { useAuthStore } from '~/shared/stores/auth-store';

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (authStore.user) {
    return navigateTo('/dashboard');
  }
});
