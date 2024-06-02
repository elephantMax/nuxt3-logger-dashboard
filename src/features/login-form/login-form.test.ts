import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import LoginForm from './login-form.vue';
import { useAuthStore } from '~/shared/stores/auth-store';

describe('login-form', () => {
  const authStore = useAuthStore();

  beforeEach(() => {
    authStore.$reset();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('successfully rendered', async () => {
    expect(authStore.authorized).toBe(false);

    const form = await mountSuspended(LoginForm);

    expect(form.exists()).toBe(true);
  });

  it('successfully logged in', async () => {
    const tokensStorage = useTokensStorage();

    const loginHandler = vi.spyOn(authStore.$api.auth, 'login').mockImplementation(async () => {
      return {
        user: {
          login: 'myLogin123',
          name: 'Fritz',
        },
        tokens: {
          access: 'some_access_token',
          refresh: 'some_refresh_token',
        },
      };
    });

    expect(authStore.authorized).toBe(false);

    const form = await mountSuspended(LoginForm);

    const loginInput = form.find<HTMLInputElement>('[data-test="login-input"]');
    const passwordInput = form.find<HTMLInputElement>('[data-test="password-input"]');

    loginInput.setValue('login test');
    passwordInput.setValue('password');

    expect(loginInput.element.value).toBe('login test');
    expect(passwordInput.element.value).toBe('password');

    await form.trigger('submit');

    expect(loginHandler).toHaveBeenCalledTimes(1);

    expect(authStore.authorized).toBe(true);
    expect(authStore.user).toEqual({ login: 'myLogin123', name: 'Fritz' });

    expect(tokensStorage.get()).toEqual({
      accessToken: 'some_access_token',
      refreshToken: 'some_refresh_token',
    });
  });
});
