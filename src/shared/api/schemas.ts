import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  login: z.string(),
  name: z.string(),
});

export const loginResponseValidator = z.object({
  user: userSchema,
  tokens: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;
