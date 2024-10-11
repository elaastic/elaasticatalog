<script setup lang="ts"></script>

<template>
  <UContainer class="flex flex-col items-center">
    <UContainer
      class="flex h-fit w-full justify-center gap-3 rounded-4 md:flex-row max-w-lg"
    >
      <slot name="searchBar" />
    </UContainer>
    <slot name="results" />
  </UContainer>
</template>

<style scoped></style>
