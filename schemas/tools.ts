import { z } from '@nuxt/content';
import { imageSchema } from './common';

const categorySchema = z.object({
  title: z.string(),
  items: z.array(imageSchema),
});

export const toolsSchema = z.object({
  tools: z.object({
    frontend: categorySchema,
    backend: categorySchema,
    development: categorySchema,
    other: categorySchema,
  }),
});
