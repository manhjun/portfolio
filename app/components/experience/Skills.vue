<script setup lang="ts">
import type { Skill } from '@/types/experience';

const props = defineProps<{
  skills?: Skill[];
}>();

const skillCount = props.skills?.length || 0;
const displaySkills = props.skills?.slice(0, 2) || [];
const remainingCount = skillCount - 2;
const remainingSkills =
  props.skills
    ?.slice(2)
    .map((skill) => skill.name)
    .join(', ') || '';
</script>

<template>
  <div class="mt-2 font-medium text-sm">
    <template
      v-for="(skill, index) in displaySkills"
      :key="skill.name"
    >
      {{ skill.name }}<span v-if="index < displaySkills.length - 1">, </span>
    </template>

    <UPopover
      v-if="remainingCount > 0"
      :ui="{
        content: 'flex items-center px-2.5 py-1 text-xs text-inverted bg-inverted select-none',
        arrow: 'fill-(--ui-bg-inverted) stroke-(--ui-bg-inverted)',
      }"
      arrow
      mode="hover"
      :content="{
        side: 'top',
        sideOffset: 1,
      }"
    >
      <UButton
        :label="`and +${remainingCount} skill${remainingCount !== 1 ? 's' : ''}`"
        variant="link"
        :ui="{
          base: 'ml-1 p-0 font-medium text-sm text-default cursor-help underline decoration-dotted underline-offset-2',
        }"
      />

      <template #content>
        <span>{{ remainingSkills }}</span>
      </template>
    </UPopover>
  </div>
</template>
