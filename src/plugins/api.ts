export default defineNuxtPlugin(() => {
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
        const canRetry = typeof options.retry === 'number' && options.retry > 0;

        if (response.status !== 401 || !refreshTokenCookie.value || !canRetry) {
          return;
        }

        const request = await refreshFetcher<{
          data: {
            accessToken: string;
            refreshToken: string;
          };
        }>('/api/refresh', {
          method: 'POST',
          body: {
            refreshToken: refreshTokenCookie.value,
          },
        });

        const { data } = request;

        tokensStorage.set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
      }
      catch (error) {
        navigateTo('/logout');
      }
    },
  });

  return {
    provide: {
      api: fetcher,
    },
  };
});
