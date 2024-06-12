import type { Tokens } from '~/shared/types';

export const useTokensStorage = () => {
  const storage = useState<Tokens | null>('tokens', () => null);

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
