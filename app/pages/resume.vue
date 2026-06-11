<script setup lang="ts">
const { data: page } = await useAsyncData('resume', () => {
  return queryCollection('resume').first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo.title || page.value?.title,
  ogTitle: page.value?.seo.title || page.value?.title,
  description: page.value?.seo.description || page.value?.description,
  ogDescription: page.value?.seo.description || page.value?.description,
});

definePageMeta({
  layout: 'blank',
  label: 'Resume',
  order: 5,
  nav: true,
});
</script>

<template>
  <ResumeTemplate1
    v-if="page"
    :page
  />
</template>
