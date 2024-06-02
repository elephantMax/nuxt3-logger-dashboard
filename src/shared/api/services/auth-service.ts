import type { ZodSchema } from 'zod';
import { z } from 'zod';
import type { $Fetch, NitroFetchOptions } from 'nitropack';
import HttpFactory from '../httpFactory';
import { loginResponseValidator } from '../schemas';

class AuthService extends HttpFactory {
  constructor(fetcher: $Fetch, private refreshFetcher: $Fetch) {
    super(fetcher);
  }

  private async refreshTokenRequest<T extends ZodSchema>(url: string, schema: T, options?: NitroFetchOptions<string>): Promise<z.infer<typeof schema>> {
    const response = await this.refreshFetcher<z.infer<typeof schema>>(url, {
      method: 'post',
      ...options,
    });

    return schema.parse(response.data);
  }

  async login(login: string, password: string) {
    return this.post('/auth/login', loginResponseValidator, {
      body: {
        login,
        password,
      },
    });
  }

  async refreshToken(refreshToken: string) {
    return this.refreshTokenRequest('/auth/refresh', z.object({
      tokens: z.object({
        accessToken: z.string(),
        refreshToken: z.string(),
      }),
    }), {
      body: {
        refreshToken,
      },
    });
  }
}

export default AuthService;
