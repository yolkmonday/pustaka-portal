<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div class="h-screen flex items-center justify-center">
      <div class="text-center text-gray-400">
        <icon name="solar:chat-square-like-broken" size="40" class="" />
        <span class="mt-3 block text-sm">Belum ada Favorit</span>
      </div>
    </div>
    <bottom-menu />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
