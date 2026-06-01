import { links } from './links';

const redirect = (to: string, statusCode: 301 | 302 = 301) => ({
  redirect: {
    to,
    statusCode,
  },
});

export const redirects = {
  '/gh': redirect(links.github),
  '/github': redirect(links.github),
} as const;
