import redirects from '../redirects.json';

export const routeRedirects = Object.fromEntries(
  Object.entries(redirects).map(([from, value]) => {
    const { to, statusCode } = typeof value === 'string' ? { to: value, statusCode: 301 } : value;
    return [from, { redirect: { to, statusCode } }];
  }),
);
