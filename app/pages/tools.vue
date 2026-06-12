<script setup lang="ts">
definePageMeta({
  label: 'Tech Stack',
  order: 4,
  nav: true,
});
</script>

<template>
  <ContentPage
    v-slot="{ data }"
    collection="tools"
  >
    <div class="flex w-full max-w-xl flex-col gap-12">
      <div
        v-for="group in data.tools"
        :key="group.title"
        class="flex flex-col gap-6"
      >
        <h2 class="font-bold text-2xl">{{ group.title }}</h2>
        <div class="grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-4">
          <div
            v-for="tool in group.items"
            :key="tool.alt"
            class="flex flex-col items-center gap-2"
          >
            <UUser
              :ui="{
                root: 'justify-center items-center',
                avatar: 'bg-default rounded-none',
              }"
              orientation="vertical"
              :name="tool.alt"
              :avatar="{
                src: tool.src,
                ui: {
                  image: 'object-contain',
                },
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </ContentPage>
</template>
