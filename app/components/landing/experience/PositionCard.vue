<script setup lang="ts">
import type { Position } from '@/types/experience';

const props = defineProps<{
  position: Position;
  note?: string;
  isEducation: boolean;
}>();

const { parseDate, formatDate, calculateDuration, getEndDateText } = useDate();

const startDate = parseDate(props.position.startDate as string);
const endDate = computed(() => {
  const end = props.position.endDate;
  if (end === 'present') return 'present';
  return parseDate(end as string);
});

const duration = calculateDuration(startDate, endDate.value);
const now = new Date();
const isOngoing =
  endDate.value === 'present' ||
  (endDate.value instanceof Date && endDate.value > now && startDate <= now);
const showPresent = isOngoing && !props.isEducation;
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-wrap items-center">
      <h4 class="mr-2 font-semibold text-base">{{ position.role }}</h4>
      <span class="text-muted-foreground text-sm">{{ position.type }}</span>
    </div>

    <div class="text-muted-foreground text-sm">
      {{ formatDate(startDate) }} - {{ getEndDateText(endDate, showPresent) }}
      {{ duration !== '1 mo' ? ` · ${duration}` : '' }}
    </div>

    <span class="text-muted-foreground text-sm">{{ position.location }}</span>
    <span class="mt-1 text-foreground text-sm">{{ note }}</span>
  </div>
</template>
