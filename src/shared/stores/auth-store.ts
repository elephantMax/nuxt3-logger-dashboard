import type { User } from '~/shared/api/schemas';

export const useAuthStore = defineStore('auth', () => {
  const tokensStorage = useTokensStorage();
  const app = useNuxtApp();

  const user = ref<User | null>(null);

  const authorized = computed<boolean>(() => Boolean(user.value));

  const userName = computed<string>(() => {
    return user.value?.name ?? '';
  });

  async function login(login: string, password: string) {
    const response = await app.$api.auth.login(login, password);
    user.value = response.user;
    tokensStorage.set({
      accessToken: response.tokens.accessToken,
      refreshToken: response.tokens.refreshToken,
    });
    return response;
  }

  function logout() {
    tokensStorage.clear();
    user.value = null;
  }

  async function getUser() {
    const response = await app.$api.auth.getUser();

    user.value = response;
  }

  function $reset() {
    user.value = null;
  }

  return {
    authorized,
    user,
    userName,

    login,
    logout,
    getUser,

    $reset,
  };
});
