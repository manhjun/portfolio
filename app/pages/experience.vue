<script setup lang="ts">
const { data: page } = await useAsyncData('experience', () => {
  return queryCollection('pages').path('/experience').first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const { data: workExperience } = await useAsyncData('experience-work', () =>
  queryCollection('experience').where('stem', 'LIKE', '%work%').all(),
);

if (!workExperience.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Experience not found',
    fatal: true,
  });
}

const { data: education } = await useAsyncData('experience-education', () =>
  queryCollection('experience').where('stem', 'LIKE', '%education%').all(),
);

if (!education.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Experience not found',
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});

definePageMeta({
  label: 'Experience',
  order: 3,
  nav: true,
});
</script>

<template>
  <template v-if="page && workExperience && education">
    <LandingExperience
      title="Work"
      :page="workExperience"
    />
    <LandingExperience
      class="mt-8"
      title="Education"
      :page="education"
      is-education
    />
  </template>
</template>
