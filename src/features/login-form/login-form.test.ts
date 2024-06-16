import { beforeEach, describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import LoginForm from './login-form.vue';
import { useAuthStore } from '~/shared/stores/auth-store';

describe('login-form', () => {
  const authStore = useAuthStore();

  beforeEach(() => {
    authStore.$reset();
  });

  it('successfully rendered', async () => {
    expect(authStore.authorized).toBe(false);

    const form = await mountSuspended(LoginForm);

    expect(form.exists()).toBe(true);
  });

  it.todo('successfully logged in', async () => {
    expect(authStore.authorized).toBe(false);

    const form = await mountSuspended(LoginForm);

    const loginInput = form.find<HTMLInputElement>('[data-test="login-input"]');
    const passwordInput = form.find<HTMLInputElement>('[data-test="password-input"]');

    loginInput.setValue('login test');
    passwordInput.setValue('password');

    expect(loginInput.element.value).toBe('login test');
    expect(passwordInput.element.value).toBe('password');
  });
});
