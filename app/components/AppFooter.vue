<script setup lang="ts">
const { footer } = useAppConfig();
</script>

<template>
  <UFooter
    :ui="{
      root: 'mt-8',
      container: 'px-0 sm:px-0 lg:px-0 py-4 lg:py-4',
      left: 'lg:flex-none',
    }"
  >
    <template #left>
      <p class="text-sm">
        {{ footer.credits.before }}
        <span class="font-bold">
          {{ footer.credits.name }}
        </span>
      </p>
    </template>
  </UFooter>
</template>
