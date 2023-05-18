<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div
      class="px-3 border-b pt-2 font-bold pb-2 text-sm flex items-center gap-1 text-gray-600"
    >
      <Icon name="solar:user-circle-bold" size="23" />Profil
    </div>
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
