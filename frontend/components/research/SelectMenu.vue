<script setup lang="ts">
import { ref, watch } from "vue";
import type { PropType } from "vue";

const props = defineProps({
  modelValue: { type: Array as PropType<string[]>, required: true },
  options: { type: Array as PropType<readonly string[]>, required: true },
  searchablePlaceholder: { type: String, default: "Rechercher" },
  placeholder: { type: String, default: "Sélectionner" },
});

const emit = defineEmits(["update:modelValue"]);

const localModel = ref([...props.modelValue]);

watch(localModel, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <USelectMenu
    v-model="localModel"
    :options="options"
    multiple
    searchable
    :searchable-placeholder="searchablePlaceholder"
    :placeholder="placeholder"
    class="w-full md:w-48"
  >
    <template #label>
      <span v-if="localModel.length" class="text-ellipsis truncate">
        {{ localModel.join(", ") }}
      </span>
    </template>
  </USelectMenu>
</template>

<style scoped></style>
