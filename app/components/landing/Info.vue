<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content';

const { global } = useAppConfig();
const config = useRuntimeConfig();

defineProps<{
  page: IndexCollectionItem;
}>();

useHead({
  script: [
    {
      src: '/age.js',
      tagPosition: 'bodyClose',
    },
  ],
});

const { data: github } = await useFetch('/api/socials/github');

const resolveLink = (to: string, fallback = '') => {
  const resolvers: Record<string, () => string> = {
    github: () => github.value?.url || fallback,

    discord: () =>
      config.public.discordKind === 'server'
        ? config.public.discordInvite
        : `https://discord.com/users/${config.public.discordUserId}`,

    instagram: () => `https://instagram.com/${config.public.instagramUsername}`,

    x: () => `https://x.com/${config.public.xUsername}`,
  };

  return resolvers[to]?.() || to || fallback;
};

const links = computed(() =>
  global.links.map((item) => ({
    ...item,
    to: resolveLink(item.to, item.fallback),
  })),
);
</script>

<template>
  <UPageSection
    :ui="{
      container: 'px-0 sm:px-0 lg:px-0 py-0 sm:py-0 lg:py-0',
      headline: 'flex justify-between',
      description: 'text-left mt-4 text-default text-md sm:text-md text-pretty',
      footer: 'mt-4',
      links: 'gap-x-4 gap-y-4 justify-start',
    }"
  >
    <template #headline>
      <h2 class="font-jetbrains font-medium text-2xl tracking-tight">
        {{ page.hero.title }}
      </h2>

      <ColorModeButton />
    </template>

    <template #description>
      <MDC
        :value="page.hero.description"
        unwrap="p"
      />
    </template>

    <template #links>
      <ULink
        v-for="(link, index) of links"
        :key="index"
        :to="link.to"
        :target="link.target"
        :aria-label="link['aria-label']"
        rel="noopener noreferrer"
        as="button"
      >
        <UIcon
          :name="link.icon"
          class="size-5"
        />
      </ULink>
    </template>
  </UPageSection>
</template>

<style>
#age {
  min-width: 12ch;
  font-family: monospace;
  display: inline-block;
}
</style>
