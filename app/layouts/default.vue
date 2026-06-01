<script setup lang="ts"></script>

<template>
  <UContainer class="max-w-xl min-h-screen flex flex-col sm:px-4 lg:px-4 pt-20">
    <ArtPlum />

    <AppMain class="flex-1">
      <slot />
    </AppMain>

    <AppFooter />
  </UContainer>
</template>
