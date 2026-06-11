import { defineCollection, defineContentConfig, z } from '@nuxt/content';

import { baseSchema } from './schemas/common';
import { experienceSchema } from './schemas/experience';
import { toolsSchema } from './schemas/tools';
import { languagesSchema } from './schemas/languages';
import { resumeSchema } from './schemas/resume';

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: baseSchema.extend({
          links: z.array(
            z.object({
              name: z.string(),
              url: z.string().editor({ input: 'link' }),
              icon: z.string().optional(),
            }),
          ),
        }),
        about: baseSchema,
      }),
    }),

    experience: defineCollection({
      type: 'data',
      source: 'experience/**/*.yml',
      schema: experienceSchema,
    }),

    pages: defineCollection({
      type: 'page',
      source: [{ include: 'experience.yml' }, { include: 'education.yml' }],
    }),

    tools: defineCollection({
      type: 'page',
      source: 'tools.yml',
      schema: toolsSchema,
    }),

    languages: defineCollection({
      type: 'data',
      source: 'languages.yml',
      schema: languagesSchema,
    }),

    resume: defineCollection({
      type: 'page',
      source: 'resume.yml',
      schema: resumeSchema,
    }),
  },
});
