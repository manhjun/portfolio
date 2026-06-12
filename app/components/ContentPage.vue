<script setup lang="ts" generic="T extends keyof Collections, M extends boolean = false">
import type { Collections, PageCollectionItemBase } from '@nuxt/content';

const OPERATORS = { like: 'LIKE', eq: '=', gt: '>', lt: '<' } as const;

const props = defineProps<{
  collection: T;
  path?: string;
  where?: Record<string, any>;
  order?: Record<string, 'ASC' | 'DESC'>;
  limit?: number;
  multiple?: boolean;
  queryKey?: string;
  disableSeo?: boolean;
}>();

defineSlots<{
  default(props: { data: M extends true ? Collections[T][] : Collections[T] }): any;
}>();

const key = computed(
  () => props.queryKey || `${props.collection}-${props.path}-${JSON.stringify(props.where)}`,
);

const { data } = await useAsyncData(key, async () => {
  let query = queryCollection(props.collection);

  if (props.path) query = query.path(props.path);

  if (props.where) {
    for (const [k, v] of Object.entries(props.where)) {
      if (typeof v === 'object' && v !== null) {
        for (const [op, sql] of Object.entries(OPERATORS)) {
          if (op in v) query = query.where(k as any, sql, v[op]);
        }
      } else {
        query = query.where(k as any, '=', v);
      }
    }
  }

  if (props.order) {
    Object.entries(props.order).forEach(([key, value]) => {
      query = query.order(key as any, value);
    });
  }

  if (props.limit) query = query.limit(props.limit);

  return props.multiple ? query.all() : query.first();
});

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Content not found',
    fatal: true,
  });
}

if (!props.disableSeo && !props.multiple && !Array.isArray(data.value)) {
  const page = data.value as PageCollectionItemBase;

  useSeoMeta({
    title: page.seo?.title || page.title,
    ogTitle: page.seo?.title || page.title,
    description: page.seo?.description || page.description,
    ogDescription: page.seo?.description || page.description,
  });
}

const slotData = computed(() => data.value as M extends true ? Collections[T][] : Collections[T]);
</script>

<template>
  <slot :data="slotData" />
</template>
