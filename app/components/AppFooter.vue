<script setup lang="ts">
const { footer } = useAppConfig();
</script>

<template>
  <UFooter
    :ui="{
      root: 'mt-8',
      container: 'px-0 sm:px-0 lg:px-0 py-4 lg:py-4',
      left: 'text-muted text-xs',
    }"
    class="z-10 bg-default"
  >
    <template #left>
      <p class="text-sm">
        &copy; {{ footer.credits.year }} {{ footer.credits.message }}
        <span class="font-bold text-default">
          {{ footer.credits.name }}
        </span>
      </p>
    </template>
  </UFooter>
</template>
