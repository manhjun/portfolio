<script setup lang="ts">
const colorMode = useColorMode();

const nextTheme = computed(() => (colorMode.value === 'dark' ? 'light' : 'dark'));

const switchTheme = () => {
  colorMode.preference = nextTheme.value;
};
</script>

<template>
  <UButton
    :aria-label="`Switch to ${nextTheme} mode`"
    color="neutral"
    variant="ghost"
    size="md"
    class="relative h-9 w-9 rounded-md p-2 transition-all"
    @click="switchTheme"
  >
    <Icon
      name="i-lucide-moon"
      size="1.2rem"
      class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />

    <Icon
      name="i-lucide-sun"
      size="1.2rem"
      class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />

    <span class="sr-only">Toggle theme</span>
  </UButton>
</template>
