import type { Tokens } from '~/shared/types';

export const useTokensStorage = () => {
  const storage = useLocalStorage<Tokens | null>('tokens', () => null, {
    serializer: {
      read(raw) {
        return JSON.parse(raw);
      },
      write(value) {
        return JSON.stringify(value);
      },
    },
  });

  const get = (): Tokens | null => {
    return storage.value;
  };

  const getSpecificToken = (key: keyof Tokens): string | null => {
    if (!storage.value) {
      return null;
    }

    return storage.value[key];
  };

  const set = (tokens: Tokens): void => {
    storage.value = tokens;
  };

  const clear = (): void => {
    storage.value = null;
  };

  return { get, getSpecificToken, set, clear };
};
