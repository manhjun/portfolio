<script setup lang="ts">
const { data: page } = await useAsyncData('index-app-main', () => {
  return queryCollection('index').first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  });
}

const router = useRouter();

const items = computed(() =>
  router
    .getRoutes()
    .filter((r) => r.meta?.nav)
    .sort((a, b) => (a.meta.order ?? 0) - (b.meta.order ?? 0))
    .map((r) => ({
      href: r.path,
      value: String(r.name),
      label: String(r.meta.label ?? r.name),
    })),
);
</script>

<template>
  <UPageSection
    v-if="page"
    :ui="{
      container: 'px-0 sm:px-0 lg:px-0 flex flex-col lg:grid py-0 sm:py-0 lg:py-0 gap-8 sm:gap-8',
    }"
  >
    <LandingInfo :page />

    <section class="flex flex-col gap-8">
      <UNavigationMenu
        :items="items"
        highlight
        highlight-color="primary"
        class="data-[orientation=horizontal]:border-b border-default data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
      />

      <slot />
    </section>
  </UPageSection>
</template>
