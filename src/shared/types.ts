import type { User } from './api/schemas';

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export namespace Stores {
  export type UserStore = {
    authorized: boolean;
    user: User | null;
  };
}
