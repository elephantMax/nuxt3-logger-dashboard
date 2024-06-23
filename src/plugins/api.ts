import AuthService from '~/shared/api/services/auth-service';

export interface ApiInstance {
  auth: AuthService;
}

export default defineNuxtPlugin({
  name: 'api',
  setup() {
    const app = useNuxtApp();
    const config = useRuntimeConfig();
    const tokensStorage = useTokensStorage();

    const refreshFetcher = $fetch.create({
      baseURL: config.public.API_BASE_URL,
      retryStatusCodes: [],
      retry: 0,
    });

    const fetcher = $fetch.create({
      baseURL: config.public.API_BASE_URL,
      retryStatusCodes: [401],
      retry: 1,
      onRequest({ options }) {
        const accessToken = tokensStorage.getSpecificToken('accessToken');

        if (accessToken) {
          options.headers = options.headers || {};
          // @ts-expect-error
          options.headers.Authorization = `Bearer ${accessToken}`;
        }
      },
      async onResponseError({ response, options }) {
        try {
          const refreshToken = tokensStorage.getSpecificToken('refreshToken');

          const canRetry = typeof options.retry === 'number' && options.retry > 0;

          if (response.status !== 401 || !refreshToken || !canRetry) {
            return;
          }

          const request = await app.$api.auth.refreshToken(refreshToken);

          const { tokens } = request;

          tokensStorage.set({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          });
        }
        catch {
          navigateTo('/logout');
        }
      },
    });

    const services: ApiInstance = {
      auth: new AuthService(fetcher, refreshFetcher),
    };

    return {
      provide: {
        fetcher,
        api: services,
      },
    };
  },
});
