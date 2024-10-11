<script setup lang="ts">
// Generate filters array using the centralized object
import { type Subject, subjectIcons, SUBJECTS } from "~/models";

const filters = SUBJECTS.map((subject) => ({
  label: subject,
  icon: subjectIcons[subject as Subject] || "i-heroicons-academic-cap",
}));
</script>

<template>
  <UContainer class="mt-4 py-2 flex overflow-auto justify-center gap-3">
    <FilterButton
      v-for="filter in filters"
      :key="filter.label"
      :label="filter.label"
      :icon="filter.icon"
    />
  </UContainer>
</template>

<style scoped></style>
