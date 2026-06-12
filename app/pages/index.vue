<script setup lang="ts">
definePageMeta({
  label: 'About',
  order: 1,
  nav: true,
});
</script>

<template>
  <ContentPage
    v-slot="{ data: about }"
    collection="index"
  >
    <LandingAbout :page="about" />

    <ContentPage
      v-slot="{ data: languages }"
      collection="languages"
    >
      <LanguageSection :page="languages" />
    </ContentPage>
  </ContentPage>
</template>
