import type { $Fetch, NitroFetchOptions } from 'nitropack';
import type { ZodSchema, z } from 'zod';

class HttpFactory {
  private $fetch: $Fetch;

  constructor(fetcher: $Fetch) {
    this.$fetch = fetcher;
  }

  protected async get<T extends ZodSchema>(url: string, schema: T, options?: NitroFetchOptions<string>): Promise<z.infer<typeof schema>> {
    const response = await this.$fetch<z.infer<typeof schema>>(url, {
      method: 'get',
      ...options,
    });

    return schema.parse(response);
  }

  protected async post<T extends ZodSchema>(url: string, schema: T, options?: NitroFetchOptions<string>): Promise<z.infer<typeof schema>> {
    const response = await this.$fetch<z.infer<typeof schema>>(url, {
      method: 'post',
      ...options,
    });

    return schema.parse(response);
  }

  protected async put<T extends ZodSchema>(url: string, schema: T, options?: NitroFetchOptions<string>): Promise<z.infer<typeof schema>> {
    const response = await this.$fetch<z.infer<typeof schema>>(url, {
      method: 'put',
      ...options,
    });

    return schema.parse(response);
  }

  protected async delete<T extends ZodSchema>(url: string, schema: T, options?: NitroFetchOptions<string>): Promise<z.infer<typeof schema>> {
    const response = await this.$fetch<z.infer<typeof schema>>(url, {
      method: 'delete',
      ...options,
    });

    return schema.parse(response);
  }
}

export default HttpFactory;
