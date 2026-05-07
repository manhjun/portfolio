import { z } from '@nuxt/content';

const certificateSchema = z.object({
  name: z.string(),
  score: z.union([z.string(), z.number()]).optional(),
  level: z.string().optional(),
});

const languageSchema = z.object({
  name: z.string(),
  flag: z.string(),
  proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Native']),
  skills: z.record(z.string(), z.number()).optional(),
  learning: z.boolean().default(false),
  certificate: certificateSchema.optional(),
  note: z.string().optional(),
  border: z.boolean().default(false),
});

export const languagesSchema = z.object({
  languages: z.array(languageSchema),
});
