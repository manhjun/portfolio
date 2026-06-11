import { z } from '@nuxt/content';

const periodSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
});

export const resumeSchema = z.object({
  name: z.object({
    first: z.string(),
    middle: z.string().optional(),
    last: z.string(),
  }),

  about: z.string(),
  position: z.string(),

  contact: z.object({
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    links: z.array(
      z.object({
        site: z.string(),
        name: z.string(),
        url: z.string(),
      }),
    ),
  }),

  education: z.array(
    z.object({
      school: z.string(),
      degree: z.string(),
      major: z.string(),
      period: periodSchema,
      gpa: z.string(),
    }),
  ),

  experience: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      period: periodSchema,
      description: z.string(),
    }),
  ),

  projects: z.array(
    z.object({
      company: z.string(),
      name: z.string(),
      period: periodSchema,
    }),
  ),

  skills: z.array(
    z.object({
      category: z.string(),
      items: z.array(z.string()),
    }),
  ),
});
