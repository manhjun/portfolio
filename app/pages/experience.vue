<script setup lang="ts">
definePageMeta({
  label: 'Experience',
  order: 3,
  nav: true,
});
</script>

<template>
  <ContentPage
    collection="pages"
    path="/experience"
  >
    <ContentPage
      v-slot="{ data }"
      collection="experience"
      :where="{
        stem: { like: '%work%' },
      }"
      multiple
    >
      <Experience
        title="Work"
        :page="data"
      />
    </ContentPage>

    <ContentPage
      v-slot="{ data }"
      collection="experience"
      :where="{
        stem: { like: '%education%' },
      }"
      multiple
    >
      <Experience
        class="mt-8"
        title="Education"
        title-as="h2"
        :page="data"
        hide-present
      />
    </ContentPage>
  </ContentPage>
</template>
