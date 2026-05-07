<script setup lang="ts">
import type { LanguagesCollectionItem } from '@nuxt/content';

defineProps<{
  page: LanguagesCollectionItem;
}>();
</script>

<template>
  <div class="flex flex-col gap-6 mt-8">
    <h2 class="font-bold text-2xl">Languages</h2>

    <div class="flex flex-col gap-6">
      <div
        v-for="lang in page.languages"
        :key="`${lang.name}-${lang.flag}`"
        class="flex gap-4"
      >
        <div class="flex mt-1">
          <span
            :class="[
              'fi',
              `fi-${lang.flag}`,
              'w-fit h-fit text-xl rounded-xs object-cover',
              lang.border && 'ring-1 ring-default dark:ring-0',
            ]"
          />
        </div>

        <div class="flex grow flex-col">
          <div class="flex flex-col">
            <div class="flex items-center">
              <h3 class="font-semibold text-lg">
                {{ lang.name }}
              </h3>
              ㆍ
              <span class="text-muted-foreground text-sm">
                {{ lang.proficiency }}
              </span>
            </div>

            <div
              v-if="lang.learning"
              class="flex items-center gap-2"
            >
              <UBadge
                color="success"
                variant="outline"
                size="md"
                label="Currently learning"
                class="gap-2 px-0 rounded-full ring-0"
              >
                <template #leading>
                  <span class="relative flex size-2">
                    <span
                      class="absolute inline-flex size-full rounded-full opacity-75 bg-success animate-ping"
                    />
                    <span class="relative inline-flex size-2 scale-90 rounded-full bg-success" />
                  </span>
                </template>
              </UBadge>
            </div>
          </div>

          <div
            v-if="lang.skills"
            class="flex flex-col mt-2"
          >
            <h4 class="text-sm font-medium">Skills</h4>

            <ul class="flex flex-col pl-4">
              <li
                v-for="(value, key, index) in lang.skills"
                :key="key"
                class="text-sm font-medium relative before:absolute before:-left-3 before:top-0 before:bottom-0 before:border-l before:border-default after:absolute after:-left-3 after:top-1/3 after:w-2 after:h-2 after:border-b after:border-l after:border-default after:-translate-y-1/2"
                :class="{
                  'before:bottom-1/2': index === Object.keys(lang.skills).length - 1,
                }"
              >
                {{ key }} · {{ value }}
              </li>
            </ul>
          </div>

          <div
            v-if="lang.certificate"
            class="mt-2 font-medium text-sm"
          >
            {{ lang.certificate.name }}

            <span
              v-if="lang.certificate.name && (lang.certificate.score || lang.certificate.level)"
            >
              ·
            </span>

            <span v-if="lang.certificate.score">{{ lang.certificate.score }} </span>
            <span v-if="lang.certificate.level">{{ lang.certificate.level }} </span>
          </div>

          <span
            v-if="lang.note"
            class="mt-1 text-foreground text-sm"
          >
            {{ lang.note }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
