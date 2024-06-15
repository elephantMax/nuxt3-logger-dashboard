import { useAuthStore } from '~/shared/stores/auth-store';

export default defineNuxtRouteMiddleware(async () => {
  try {
    const authStore = useAuthStore();
    const tokensStorage = useTokensStorage();

    const accessToken = tokensStorage.getSpecificToken('accessToken');

    if (authStore.user || !accessToken) {
      return;
    }

    await authStore.getUser();
  }
  catch (error) {
    return navigateTo('/logout');
  }
});
