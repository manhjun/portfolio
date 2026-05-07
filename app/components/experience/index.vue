<script setup lang="ts">
import type { ExperienceCollectionItem } from '@nuxt/content';
import type { TimelineItem } from '@nuxt/ui';

defineProps<{
  title: string;
  titleAs?: string;
  hidePresent?: boolean;
  page: ExperienceCollectionItem[];
}>();

const { calculateTotalCompanyDuration } = useDate();

const imgErrors = ref<Record<string, boolean>>({});

type ExperienceTimelineItem = TimelineItem & {
  _raw: ExperienceCollectionItem['position'] | null;
  _isMain?: boolean;
  _isGhost?: boolean;
};

const getTimelineItems = (experience: ExperienceCollectionItem): ExperienceTimelineItem[] => {
  const mainItem: ExperienceTimelineItem = {
    _raw: experience.position,
    _isMain: true,
  };

  const promotionItems: ExperienceTimelineItem[] = (experience.promotions ?? []).map((p) => ({
    _raw: p,
    _isMain: false,
  }));

  const ghostItem: ExperienceTimelineItem = {
    _isGhost: true,
    _raw: null,
  };

  return [mainItem, ...promotionItems, ghostItem];
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <component
      :is="titleAs ?? 'h1'"
      class="font-bold text-2xl"
    >
      {{ title }}
    </component>

    <div class="flex flex-col gap-8">
      <div
        v-for="experience in page"
        :key="experience.id"
        class="flex gap-4"
      >
        <UAvatar
          :ui="{ image: 'object-contain' }"
          :src="experience.company.logo"
          :alt="experience.company.name"
          :text="experience.company.name.charAt(0)"
          :class="[
            !experience.company.logo || imgErrors[experience.id] ? 'border border-default' : '',
          ]"
          class="bg-default rounded-md"
          size="xl"
          @error="imgErrors[experience.id] = true"
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
              v-if="!hidePresent"
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
            <UTimeline
              :ui="{
                indicator: 'bg-default',
                item: 'last:hidden',
              }"
              :items="getTimelineItems(experience)"
              size="3xs"
            >
              <template #indicator="{ item }">
                <div
                  class="size-4 rounded-full bg-default ring ring-default flex items-center justify-center my-1"
                >
                  <div
                    :class="(item as ExperienceTimelineItem)._isMain ? 'size-2.5' : 'size-2'"
                    class="rounded-full bg-primary"
                  />
                </div>
              </template>

              <template #wrapper="{ item }">
                <template v-if="!(item as ExperienceTimelineItem)._isGhost">
                  <ExperiencePositionCard
                    :position="(item as ExperienceTimelineItem)._raw!"
                    :hide-present="hidePresent"
                  />

                  <ExperienceSkills :skills="experience.skills" />
                </template>
              </template>
            </UTimeline>
          </div>

          <div
            v-else
            class="flex flex-col"
          >
            <ExperiencePositionCard
              :hide-present="hidePresent"
              :position="experience.position"
            />

            <ExperienceSkills :skills="experience.skills" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
