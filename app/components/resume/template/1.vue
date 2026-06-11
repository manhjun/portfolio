<script setup lang="ts">
import type { ResumeCollectionItem } from '@nuxt/content';

const props = defineProps<{
  page: ResumeCollectionItem;
}>();

const { parseDate, formatDate } = useDate();
const { formatPhone, toTelHref } = usePhone();

const fullName = computed(
  () => `${props.page.name.first} ${props.page.name?.middle} ${props.page.name.last}`,
);
</script>

<template>
  <div class="shadow-lg w-[210mm] mx-auto">
    <div
      id="resume-page"
      class="flex font-roboto w-[210mm] min-h-[297mm]"
    >
      <div class="w-[35%] px-5 py-8 text-center border-r">
        <div class="text-2xl mb-8 pb-8 border-b">
          <p class="mb-4 font-bold">
            {{ fullName }}
          </p>

          <p class="text-sm tracking-widest">
            {{ page.position }}
          </p>
        </div>

        <div>
          <p class="mb-4">{{ page.contact.location }}</p>

          <p class="text-xs mb-2">
            <a :href="toTelHref(page.contact.phone)">
              {{ formatPhone(page.contact.phone, 'international-parentheses') }}
            </a>
          </p>

          <p class="text-xs mb-2">
            <a :href="`mailto:${page.contact.email}`">
              {{ page.contact.email }}
            </a>
          </p>

          <p
            v-for="(link, index) in page.contact.links"
            :key="index"
            class="mb-2"
          >
            {{ link.site }}:
            <a
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-400"
            >
              {{ link.name }}
            </a>
          </p>
        </div>

        <div class="border-b-4 w-1/3 mx-auto my-8" />

        <div>
          <p class="uppercase tracking-widest text-base font-medium mb-3">Education</p>

          <div
            v-for="(education, index) in page.education"
            :key="index"
            class="text-xs"
          >
            <p class="mb-2">{{ education.degree }} / {{ education.major }} • {{ education.gpa }}</p>
            <p class="mb-2">{{ education.school }}</p>
            <p class="mb-2">
              {{ formatDate(parseDate(education.period.startDate)) }} -
              {{ formatDate(parseDate(education.period.endDate)) }}
            </p>

            <div
              v-if="page.education.length > 1 && index < page.education.length - 1"
              class="border-b w-1/4 mx-auto my-3"
            />
          </div>
        </div>

        <div class="border-b-4 w-1/3 mx-auto my-8" />

        <div>
          <p class="uppercase tracking-widest text-base font-medium mb-4">Skills</p>

          <div
            v-for="(skill, index) in page.skills"
            :key="index"
            class="mb-3 text-xs"
          >
            <p class="font-semibold mb-2">
              {{ skill.category }}
            </p>

            <div class="flex flex-wrap justify-center gap-1">
              <span
                v-for="item in skill.items"
                :key="item"
                class="border rounded px-2 py-1"
              >
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="w-[65%]">
        <div class="px-5 py-8 border-b">
          <p class="uppercase tracking-widest text-base font-medium mb-3">{{ page.position }}</p>

          <p>{{ page.about }}</p>
        </div>

        <div class="px-5 py-8">
          <p class="uppercase tracking-widest text-base font-medium mb-3">Work Experience</p>

          <div
            v-for="({ company, position, period, description }, index) in page.experience"
            :key="index"
            class="mb-6"
          >
            <div class="text-xs italic">
              {{ formatDate(parseDate(period.startDate)) }} -
              {{ formatDate(parseDate(period.endDate)) }}
            </div>

            <div class="font-bold">{{ company }}</div>

            <div class="mb-3">{{ position }}</div>

            <MDC
              :value="description"
              class="text-sm [&_p]:my-1 [&_p]:leading-5 [&_ul]:my-1 [&_li]:my-2 [&_li]:p-0 [&_li::marker]:text-default [&_li]:leading-5"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
