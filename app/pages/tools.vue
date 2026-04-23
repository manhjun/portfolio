<script setup lang="ts">
const { data: page } = await useAsyncData('tools', () => {
  return queryCollection('tools').first();
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
  label: 'Tech Stack',
  order: 4,
  nav: true,
});
</script>

<template>
  <template v-if="page">
    <div class="flex w-full max-w-xl flex-col gap-12">
      <div
        v-for="group in page.tools"
        :key="group.title"
        class="flex flex-col gap-6"
      >
        <h2 class="font-bold text-2xl">{{ group.title }}</h2>
        <div class="grid grid-cols-3 gap-4 md:grid-cols-4">
          <div
            v-for="tool in group.items"
            :key="tool.alt"
            class="flex flex-col items-center gap-2"
          >
            <div class="flex h-10 w-10 items-center justify-center">
              <NuxtImg
                :width="32"
                :height="32"
                :src="tool.src"
                :alt="tool.alt"
                loading="eager"
              />
            </div>
            <span class="text-muted-foreground text-xs">{{ tool.alt }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
