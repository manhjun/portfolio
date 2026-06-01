export default defineAppConfig({
  global: {
    email: 'contact@dungnm.me',
  },
  ui: {
    colors: {
      neutral: 'neutral',
    },
    pageHero: {
      slots: {
        container: 'p-0!',
        title: 'font-bold text-left text-xl sm:text-xl lg:text-2xl',
        description: 'text-left text-wrap text-md sm:text-md lg:text-md text-pretty! mt-3!',
      },
    },
  },
  footer: {
    credits: {
      before: 'Made with ❤️ by',
      name: 'Mạnh Dũng',
    },
  },
});
