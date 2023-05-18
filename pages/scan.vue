<template>
  <div class="h-screen flex">
    <NuxtLink
      to="/"
      class="absolute top-3 left-3 z-[999] text-gray-600 h-10 w-10 flex items-center justify-center rounded-full bg-white"
    >
      <Icon name="ic:round-arrow-back" size="24" />
    </NuxtLink>

    <div class="h-3/4">
      <scan-code />
    </div>
    <div>
      {{ siklus.data }}
    </div>
  </div>
</template>

<script setup>
import { useSiklus } from "../store/siklus";
definePageMeta({
  middleware: "auth",
});
const siklus = useSiklus();
siklus.checkSiklus();
</script>
