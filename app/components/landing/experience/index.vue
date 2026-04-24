<script setup lang="ts">
import type { ExperienceCollectionItem } from '@nuxt/content';

defineProps<{
  title: string;
  isEducation?: boolean;
  page: ExperienceCollectionItem[];
}>();

const { calculateTotalCompanyDuration } = useDate();

const imgError = ref(false);
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="font-bold text-2xl">{{ title }}</h1>

    <div class="flex flex-col gap-8">
      <div
        v-for="experience in page"
        :key="experience.id"
        class="flex gap-4"
      >
        <UAvatar
          :ui="{
            image: 'object-contain',
          }"
          :src="experience.company.logo"
          :alt="experience.company.name"
          :text="experience.company.name.charAt(0)"
          :class="[!experience.company.logo || imgError ? 'border border-default' : '']"
          class="bg-default rounded-md"
          size="xl"
          @error="imgError = true"
        />

        <div class="flex grow flex-col">
          <div class="mb-2 flex flex-col">
            <h2 class="font-semibold text-lg">
              <a
                v-if="experience.company.url"
                class="underline decoration-transparent transition-colors hover:text-primary hover:decoration-current"
                :href="experience.company.url"
                rel="noopener noreferrer"
                target="_blank"
              >
                {{ experience.company.name }}
              </a>

              <template v-else>{{ experience.company.name }}</template>
            </h2>

            <span
              v-if="!isEducation"
              class="text-muted-foreground text-sm"
            >
              {{ calculateTotalCompanyDuration(experience) }} ·
              {{ experience.position.type }}
            </span>
          </div>

          <div
            v-if="experience.promotions && experience.promotions.length > 0"
            class="relative flex flex-col"
          >
            <div class="absolute top-2 bottom-2 left-1.25 w-0.5 bg-border" />

            <div class="relative flex gap-4">
              <div class="relative flex h-full w-3 items-center justify-center">
                <div class="z-10 h-3 w-3 rounded-full bg-accented" />
              </div>
              <div class="grow pt-1">
                <LandingExperiencePositionCard
                  :is-education="isEducation"
                  :note="experience.note"
                  :position="experience.position"
                />

                <LandingExperienceSkills :skills="experience.skills" />
              </div>
            </div>

            <div
              v-for="position in experience.promotions"
              :key="`${experience.company}-${position.role}`"
              class="relative mt-6 flex gap-4"
            >
              <div class="relative flex h-full w-3 items-center justify-center">
                <div class="z-10 h-2 w-2 rounded-full bg-accented" />
              </div>
              <div class="grow pt-1">
                <LandingExperiencePositionCard
                  :position="position"
                  :is-education="isEducation"
                />

                <LandingExperienceSkills :skills="experience.skills" />
              </div>
            </div>
          </div>

          <div
            v-else
            class="flex flex-col"
          >
            <LandingExperiencePositionCard
              :is-education="isEducation"
              :position="experience.position"
              :note="experience.note"
            />

            <LandingExperienceSkills :skills="experience.skills" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
