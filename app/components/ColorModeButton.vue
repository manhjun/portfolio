<script setup lang="ts">
const colorMode = useColorMode();

const nextTheme = computed(() => {
  if (colorMode.preference !== 'system') return 'system';

  return colorMode.value === 'dark' ? 'light' : 'dark';
});

const isDark = computed(() => colorMode.value === 'dark');

const switchTheme = () => {
  colorMode.preference = nextTheme.value;
};

const startViewTransition = (event: MouseEvent) => {
  const isAppearanceTransition =
    !!document.startViewTransition &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!isAppearanceTransition) {
    switchTheme();
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = document.startViewTransition(async () => {
    switchTheme();
    await nextTick();
  });

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-out',
        fill: 'forwards',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      },
    );
  });
};
</script>

<template>
  <UButton
    :aria-label="`Switch to ${nextTheme} mode`"
    color="neutral"
    variant="ghost"
    size="md"
    class="relative h-9 w-9 rounded-md p-2 transition-all"
    @click="startViewTransition"
  >
    <Icon
      name="i-lucide-sun"
      size="1.2rem"
      class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />

    <Icon
      name="i-lucide-moon"
      size="1.2rem"
      class="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />

    <span class="sr-only">Toggle theme</span>
  </UButton>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
