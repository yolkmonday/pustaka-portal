<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <NuxtLink to="/login">too</NuxtLink>
    halo
    <bottom-menu />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
