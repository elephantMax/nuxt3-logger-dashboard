import type { UseFetchOptions } from '#app';

export const useAppFetch = <T>(url: string, options: UseFetchOptions<T> = {}) => {
  const app = useNuxtApp();

  return useFetch(url, {
    $fetch: app.$api,
    ...options,
  });
};
