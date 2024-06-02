import type { PiniaPluginContext } from 'pinia';
import type { ApiInstance } from './api';

function setupPiniaClient({ store }: PiniaPluginContext, $api: ApiInstance) {
  store.$api = $api;
}

export default defineNuxtPlugin({
  dependsOn: ['api'],
  setup(app) {
    const { $api, $pinia } = app;

    // @ts-expect-error
    $pinia.use(store => setupPiniaClient(store, $api));
  },
});
