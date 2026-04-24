<script setup lang="ts">
import type { Position } from '@/types/experience';

const props = defineProps<{
  position: Position;
  hidePresent: boolean;
}>();

const { formatDate, calculateDuration, getEndDateText } = useDate();

const startDate = computed(() => new Date(props.position.startDate as string));

const endDate = computed((): Date | 'present' => {
  const end = props.position.endDate;
  if (end === 'present') return 'present';
  return new Date(end as string);
});

const duration = computed(() => calculateDuration(startDate.value, endDate.value));

const isOngoing = computed(() => {
  const now = new Date();
  return (
    endDate.value === 'present' ||
    (endDate.value instanceof Date && endDate.value > now && startDate.value <= now)
  );
});

const showPresent = computed(() => isOngoing.value && props.hidePresent);

const showDuration = computed(() => duration.value && duration.value !== '1 mo');
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-wrap items-center">
      <h4 class="mr-1 font-semibold text-base">{{ position.role }}</h4>
      ·
      <span class="ml-1 text-muted-foreground text-sm">{{ position.type }}</span>
    </div>

    <div class="text-muted-foreground text-sm">
      {{ formatDate(startDate) }} - {{ getEndDateText(endDate, showPresent) }}
      <template v-if="showDuration"> · {{ duration }}</template>
    </div>

    <span class="text-muted-foreground text-sm">{{ position.location }}</span>
    <span
      v-if="position.note"
      class="mt-1 text-foreground text-sm"
    >
      {{ position.note }}
    </span>
  </div>
</template>
