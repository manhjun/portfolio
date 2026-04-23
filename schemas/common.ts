import { z } from '@nuxt/content';

export const baseSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export const createButtonSchema = z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional(),
});

export const imageSchema = z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string(),
});
