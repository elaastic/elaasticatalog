<script setup lang="ts">
defineProps({
  label: {
    type: String,
  },
  icon: {
    type: String,
  },
});
</script>

<template>
  <UButton
    :icon="icon"
    size="md"
    class="flex flex-col gap-1 bg-white transition text-slate hover:text-dark hover:bg-white"
    variant="solid"
    :label="label"
  />
</template>

<style scoped></style>
