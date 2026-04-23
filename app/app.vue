<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() => (colorMode.value === 'dark' ? '#020618' : 'white'));

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'en',
  },
  titleTemplate: (title) => (title ? `${title} | Mạnh Dũng` : 'Mạnh Dũng'),
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative min-h-0">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
