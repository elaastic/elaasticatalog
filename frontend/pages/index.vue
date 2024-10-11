<script lang="ts" setup>
import { ref, watch } from "vue";
import ResourceContainer from "~/components/resource/Container.vue";
import ResearchContainer from "~/components/research/Container.vue";
import type { Resource } from "~/models";

interface ApiResponse {
  data: Resource[];
  paginationInfo: {
    total: number;
  };
}

const page = ref(1);
const perPage = 30;
const queryParam = ref("");
const runtimeConfig = useRuntimeConfig();

const { data, status, refresh } = useFetch<ApiResponse>("/resources", {
  baseURL: runtimeConfig.public.BACK_URL as string,
  params: computed(() => ({
    page: page.value,
    perPage: perPage,
    query: queryParam.value,
  })),
});

const resources = computed(() => data.value?.data || []);
const totalItems = computed(() => data.value?.paginationInfo.total || 0);

const query = ref("");
const handleSearch = (q: string) => {
  queryParam.value = q;
  page.value = 1;
  refresh();
};

watch(page, () => {
  refresh();
});
</script>

<template>
  <div class="pb-4">
    <ResearchContainer>
      <template #searchBar>
        <UFormGroup class="w-full">
          <UInput
            v-model="query"
            :placeholder="$t('utils.simpleSearch')"
            :ui="{ placeholder: 'dark:placeholder-gray-400' }"
            size="lg"
            @keyup.enter="handleSearch(query)"
          />
        </UFormGroup>
        <UButton
          :loading="status === 'pending'"
          icon="i-heroicons-magnifying-glass"
          size="lg"
          @click="handleSearch(query)"
        />
      </template>

      <template #results>
        <div class="mt-2 text-xs text-gray-500">
          <p>
            {{ $t("utils.results_count", { count: totalItems }) }}
          </p>
        </div>
      </template>
    </ResearchContainer>

    <UDivider class="my-2" />

    <ResourceContainer v-if="status === 'pending'">
      <UContainer class="flex flex-wrap justify-center gap-4 max-w-7xl w-full">
        <ResourceSkeleton v-for="i in 10" :key="i" />
      </UContainer>
    </ResourceContainer>

    <ResourceContainer v-if="status !== 'pending'">
      <UContainer class="flex flex-wrap justify-center gap-4 max-w-7xl w-full">
        <ResourceCard
          v-if="resources.length > 0"
          v-for="resource in resources"
          :key="resource.id"
          :resource="resource"
        />
        <div v-else>
          <p class="text-center text-xl text-gray-500">
            {{ $t("utils.no_results") }}
          </p>
        </div>
      </UContainer>
      <UPagination
        v-if="resources.length > 0"
        v-model="page"
        :page-count="30"
        :total="totalItems"
        show-first
        show-last
      />
    </ResourceContainer>
  </div>
</template>

<style scoped></style>
