import { z } from '@nuxt/content';

const skillsSchema = z.object({
  name: z.string(),
});

const positionType = z.enum([
  'Co-op',
  'Internship',
  'Part-time',
  'Full-time',
  'Self-Employed',
  'Contract',
]);

const positionSchema = z.object({
  role: z.string(),
  type: positionType,
  startDate: z.date(),
  endDate: z.union([z.date(), z.literal('present')]),
  location: z.string(),
});

export const experienceSchema = z.object({
  company: z.object({
    name: z.string(),
    url: z.string().url().optional(),
    logo: z.string().optional(),
  }),
  position: positionSchema,
  skills: z.array(skillsSchema),
  promotions: z.array(positionSchema).optional(),
  note: z.string().optional(),
});
