import AuthService from '~/shared/api/services/auth-service';

export interface ApiInstance {
  auth: AuthService;
}

export default defineNuxtPlugin({
  name: 'api',
  setup() {
    const config = useRuntimeConfig();
    const tokensStorage = useTokensStorage();

    const accessTokenCookie = useCookie('access_token');
    const refreshTokenCookie = useCookie('refresh_token');

    if (typeof accessTokenCookie.value === 'string' && typeof refreshTokenCookie.value === 'string') {
      tokensStorage.set({
        accessToken: accessTokenCookie.value,
        refreshToken: refreshTokenCookie.value,
      });
    }

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
          const app = useNuxtApp();

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
