<script setup lang="ts">
const { data: page } = await useAsyncData('index', () => {
  return queryCollection('index').first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const { data: languages } = await useAsyncData('languages-section', () =>
  queryCollection('languages').first(),
);

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
});

definePageMeta({
  label: 'About',
  order: 1,
  nav: true,
});
</script>

<template>
  <UPage v-if="page && languages">
    <LandingAbout :page />
    <LanguageSection :page="languages" />
  </UPage>
</template>
