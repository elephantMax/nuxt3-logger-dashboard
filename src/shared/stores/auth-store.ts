import type { Stores } from '../types';

export const useAuthStore = defineStore('auth-store', {
  state(): Stores.UserStore {
    return {
      authorized: false,
      user: null,
    };
  },
  actions: {
    async login(login: string, password: string) {
      const tokensStorage = useTokensStorage();
      const response = await this.$api.auth.login(login, password);
      this.user = response.user;
      tokensStorage.set({
        accessToken: response.tokens.access,
        refreshToken: response.tokens.refresh,
      });
      this.authorized = true;
      return response;
    },
  },
});
