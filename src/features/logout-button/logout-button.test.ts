import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import LogoutButton from './logout-button.vue';
import { useAuthStore } from '~/shared/stores/auth-store';
import type { User } from '~/shared/api/schemas';

describe('logout-button', () => {
  it('logging out user', async () => {
    const mockUser: User = {
      id: 'some_id',
      login: 'maximus',
      name: 'max',
    };

    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        auth: {
          authorized: true,
          user: mockUser,
        },
      },
      stubActions: false,
    });

    const store = useAuthStore(pinia);

    const button = await mountSuspended(LogoutButton, {
      global: {
        plugins: [pinia],
      },
    });

    expect(store.authorized).toBe(true);
    expect(store.user).toEqual(mockUser);

    await button.trigger('click');

    expect(store.logout).toHaveBeenCalledTimes(1);

    expect(store.authorized).toBe(false);
    expect(store.user).toBe(null);
  });
});
