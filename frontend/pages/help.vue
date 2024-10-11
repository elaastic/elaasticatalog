<script setup lang="ts"></script>

<template>
  <UContainer>
    <h1 class="text-2xl font-bold mb-6">{{ $t("help") }}</h1>
    <div class="flex flex-col gap-4">
      <div class="flex flex-col">
        <h2 class="text-xl font-semibold">{{ $t("helpPage.title.intro") }}</h2>
        <p>{{ $t("helpPage.intro") }}</p>
      </div>

      <div class="flex flex-col">
        <h2 class="text-xl font-semibold">
          {{ $t("helpPage.title.credits") }}
        </h2>
        <p>{{ $t("helpPage.credits") }}</p>
      </div>

      <div class="flex flex-col">
        <h2 class="text-xl font-semibold">
          {{ $t("helpPage.title.contact") }}
        </h2>
        <p>{{ $t("helpPage.contact") }}</p>
        <UButton
          to="https://github.com/elaastic"
          target="_blank"
          variant="soft"
          size="lg"
          class="mt-2 w-fit"
          icon="i-heroicons-link"
        >
          {{ $t("helpPage.github") }}
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<style scoped></style>
