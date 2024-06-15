import type { User } from '~/shared/api/schemas';

export const useAuthStore = defineStore('auth-store', () => {
  const tokensStorage = useTokensStorage();
  const app = useNuxtApp();

  const authorized = ref<boolean>(false);
  const user = ref<User | null>(null);

  async function login(login: string, password: string) {
    const response = await app.$api.auth.login(login, password);
    user.value = response.user;
    tokensStorage.set({
      accessToken: response.tokens.accessToken,
      refreshToken: response.tokens.refreshToken,
    });
    authorized.value = true;
    return response;
  }

  async function logout() {
    tokensStorage.clear();
    user.value = null;
    authorized.value = false;
  }

  async function getUser() {
    const response = await app.$api.auth.getUser();

    user.value = response;
    authorized.value = true;
  }

  function $reset() {
    authorized.value = false;
    user.value = null;
  }

  return {
    authorized,
    user,

    login,
    logout,
    getUser,

    $reset,
  };
});
