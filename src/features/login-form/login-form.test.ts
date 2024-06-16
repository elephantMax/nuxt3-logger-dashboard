import { describe, expect, it, vi } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { createTestingPinia } from '@pinia/testing';
import LoginForm from './login-form.vue';
import { useAuthStore } from '~/shared/stores/auth-store';

describe('login-form', () => {
  it('successfully rendered', async () => {
    const form = await mountSuspended(LoginForm);

    expect(form.exists()).toBe(true);
  });

  it('successfully logged in', async () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      stubActions: false,
    });

    const store = useAuthStore(pinia);

    const nuxt = useNuxtApp();

    const spyLoginRequest = vi.spyOn(nuxt.$api.auth, 'login');

    const mockUser = {
      id: 'test',
      login: 'test',
      name: 'test',
    };

    spyLoginRequest.mockImplementation(async () => {
      return {
        user: mockUser,
        tokens: {
          accessToken: 'test',
          refreshToken: 'test',
        },
      };
    });

    expect(store.authorized).toBe(false);

    const form = await mountSuspended(LoginForm, {
      global: {
        plugins: [pinia],
      },
      route: '/login',
    });

    const loginInput = form.find<HTMLInputElement>('[data-test="login-input"]');
    const passwordInput = form.find<HTMLInputElement>('[data-test="password-input"]');

    await loginInput.setValue('login test');
    await passwordInput.setValue('password');

    expect(loginInput.element.value).toBe('login test');
    expect(passwordInput.element.value).toBe('password');

    await form.trigger('submit.prevent');

    await new Promise(resolve => setTimeout(() => resolve(true), 10)); // TODO: понять норм или нет :)

    expect(store.authorized).toBe(true);
    expect(store.user).toEqual(mockUser);
    expect(store.userName).toEqual(mockUser.name);
  });
});
