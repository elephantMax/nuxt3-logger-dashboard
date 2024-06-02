import { z } from 'zod';

const userSchema = z.object({
  login: z.string(),
  name: z.string(),
});

export const loginResponseValidator = z.object({
  user: userSchema,
  tokens: z.object({
    access: z.string(),
    refresh: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;
