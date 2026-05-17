export default defineAppConfig({
  global: {
    email: 'dungnm.contact@gmail.com',

    links: [
      {
        icon: 'i-simple-icons-discord',
        to: 'discord',
        target: '_blank',
        'aria-label': 'Mạnh Dũng on Discord',
      },
      {
        icon: 'i-simple-icons-instagram',
        to: 'instagram',
        target: '_blank',
        'aria-label': 'Mạnh Dũng on Instagram',
      },
      {
        icon: 'i-simple-icons-x',
        to: 'x',
        target: '_blank',
        'aria-label': 'Mạnh Dũng on X',
      },
      {
        icon: 'i-simple-icons-github',
        to: 'github',
        fallback: 'https://github.com/manhjun',
        target: '_blank',
        'aria-label': 'Mạnh Dũng on GitHub',
      },
    ],
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
