<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content';

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
        v-for="(link, index) of page.hero.links"
        :key="index"
        :to="link.url"
        target="_blank"
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
