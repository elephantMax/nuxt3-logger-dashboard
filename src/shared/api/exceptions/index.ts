import type { ZodIssueCode } from 'zod';
import { z } from 'zod';

const zodIssuesCode = Object.keys(z.ZodIssueCode) as [ZodIssueCode, ...ZodIssueCode[]];

const validationExceptionSchema = z.object({
  data: z.object({
    status: z.literal(400),
    data: z.object({
      code: z.literal('ZodError'),
      errors: z.record(z.string(), z.enum(zodIssuesCode)),
    }),
  }),
});

export type ValidationError = z.infer<typeof validationExceptionSchema>;

export const isValidationError = (error: unknown): error is ValidationError => {
  const res = validationExceptionSchema.safeParse(error);

  return res.success;
};
