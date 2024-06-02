import 'pinia';
import type { ApiInstance } from '~/plugins/api';

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $api: ApiInstance;
  }
}
