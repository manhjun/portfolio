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

    <UTooltip
      v-if="remainingCount > 0"
      arrow
      :delay-duration="0"
      :text="remainingSkills"
      :content="{
        side: 'top',
        sideOffset: 1,
      }"
      class="ml-1 cursor-help underline decoration-dotted underline-offset-2"
    >
      <span>and +{{ remainingCount }} skill{{ remainingCount !== 1 ? 's' : '' }}</span>
    </UTooltip>
  </div>
</template>
