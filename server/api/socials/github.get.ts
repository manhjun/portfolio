export default defineCachedEventHandler(
  async () => {
    const config = useRuntimeConfig();

    try {
      const profile = await $fetch<{
        login: string;
        html_url: string;
      }>(`https://api.github.com/user/${config.githubUserId}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${config.githubToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });

      return {
        username: profile.login,
        url: profile.html_url,
      };
    } catch {
      return {
        username: null,
        url: null,
      };
    }
  },
  {
    maxAge: 60 * 60 * 24,
  },
);
