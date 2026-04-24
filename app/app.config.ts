export default defineAppConfig({
  global: {
    email: 'dungnm.contact@gmail.com',
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
      message: 'Made with ❤️ by',
      name: 'Mạnh Dũng ♐',
      year: `${new Date().getFullYear()}`,
    },
    links: [
      {
        icon: 'i-simple-icons-discord',
        to: 'https://discord.com/users/846601032288567307',
        target: '_blank',
        'aria-label': 'Mạnh Dũng on Discord',
      },
      {
        icon: 'i-simple-icons-instagram',
        to: 'https://instagram.com/__dungnm',
        target: '_blank',
        'aria-label': 'Mạnh Dũng on Instagram',
      },
      {
        icon: 'i-simple-icons-x',
        to: 'https://x.com/_dungnm',
        target: '_blank',
        'aria-label': 'Mạnh Dũng on X',
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/manhjun',
        target: '_blank',
        'aria-label': 'Mạnh Dũng on GitHub',
      },
    ],
  },
});
