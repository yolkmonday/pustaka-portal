<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div
      class="px-3 border-b justify-between pt-2 font-bold pb-2 text-lg flex items-center gap-1 text-gray-600"
    >
      <div>Riwayat</div>
      <div>
        <Icon name="solar:bill-list-bold" size="23" />
      </div>
    </div>
    <div class="h-screen flex items-center justify-center">
      <div class="text-center text-gray-400">
        <icon name="solar:notebook-square-broken" size="40" class="" />
        <span class="mt-3 block text-sm">Belum ada Riwayat</span>
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
