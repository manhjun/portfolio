<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content';

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <UPageHero
    :title="page.about.title"
    :description="page.about.description"
  />
</template>
