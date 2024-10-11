<script setup lang="ts">
import type { Resource } from "~/models";

const props = defineProps({
  resource: {
    type: Object as () => Resource,
    required: true,
  },
});

const formattedDate = computed(() => {
  return props.resource.lastUpdated
    ? new Date(props.resource.lastUpdated).toLocaleDateString("fr-FR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
    : "N/A";
});

const detailedDateTime = computed(() => {
  return props.resource.lastUpdated
    ? new Date(props.resource.lastUpdated).toLocaleString("fr-FR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A";
});
</script>

<template>
  <div
    class="w-full max-w-sm shadow-none transition border hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500 dark:bg-zinc-800 flex flex-col justify-between rounded-lg"
  >
    <!-- MAIN -->
    <div class="cursor-default">
      <div class="flex flex-col px-4 pt-3">
        <div class="flex justify-between w-full">
          <!-- TITLE + TAGS -->
          <div
            class="flex flex-col w-fit text-wrap max-w-48 truncate text-ellipsis"
          >
            <span class="text-xl font-bold">
              {{ resource.title }}
            </span>
          </div>

          <!-- AUTHOR + DATE -->
          <div
            class="flex flex-col items-end text-end text-sm mt-1 text-gray-400 truncate text-ellipsis pl-2"
          >
            <div class="flex items-center justify-end">
              <UTooltip
                :text="
                  $t('researchPage.lastUpdated') + ' : ' + detailedDateTime
                "
              >
                <div
                  class="flex items-center justify-end truncate text-ellipsis cursor-default"
                >
                  <UIcon name="i-heroicons-clock-16-solid" class="mr-1"></UIcon>
                  <span class="truncate text-ellipsis">
                    {{ formattedDate }}</span
                  >
                </div>
              </UTooltip>
            </div>
            <UTooltip
              :text="$t('researchPage.author') + ' : ' + resource.author"
            >
              <div
                class="flex items-center justify-end truncate text-ellipsis cursor-default"
              >
                <UIcon name="i-heroicons-user" class="mr-1" />
                <span class="truncate text-ellipsis">
                  {{ resource.author }}
                </span>
              </div>
            </UTooltip>
            <UTooltip :text="$t('researchPage.licence')">
              <NuxtLink
                class="flex items-center justify-end truncate text-ellipsis cursor-pointer"
                to="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr"
                target="_blank"
              >
                <UIcon name="i-heroicons-newspaper" class="mr-1" />
                <span class="truncate text-ellipsis"> CC BY-NC-SA 4.0 </span>
              </NuxtLink>
            </UTooltip>
          </div>
        </div>
        <div class="flex gap-2 flex-wrap mt-1 w-fit" v-if="resource.tags">
          <ResourceTag v-for="tag in resource.tags" :key="tag" :label="tag" />
        </div>
      </div>
      <UDivider
        class="mt-2 w-full mr-4"
        :ui="{ border: { base: 'flex border-gray-200 dark:border-gray-500' } }"
      />

      <div
        class="flex flex-col gap-1 overflow-auto pt-2 flex-grow max-h-24 p-4"
      >
        <div class="text-sm" v-if="resource.description">
          {{ resource.description }}
        </div>
        <div class="text-sm text-gray-500" v-else>
          {{ $t("researchPage.noDescription") }}
        </div>
      </div>
    </div>

    <!-- BUTTONS -->
    <div class="flex flex-wrap gap-2 p-2">
      <UButton
        icon="i-heroicons-arrow-up-right-20-solid"
        class="h-10 flex-grow justify-center"
        :label="$t('researchPage.importResource')"
        variant="soft"
        target="_blank"
        trailing
        :disabled="!resource.link"
        :to="resource.link"
      />
    </div>
  </div>
</template>

<style scoped></style>
