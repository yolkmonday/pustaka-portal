<template>
  <div class="max-w-[600px] min-h-screen mx-auto">
    <div
      class="px-3 border-b justify-between pt-2 font-bold pb-2 text-lg flex items-center gap-1 text-gray-600"
    >
      <div>
        <NuxtLink
          to="/riwayat"
          class="text-gray-600 flex items-center justify-center gap-2"
        >
          <Icon name="ic:round-arrow-back" size="24" />
          Statistik
        </NuxtLink>
      </div>
      <div>
        <Icon name="solar:graph-bold" size="23" />
      </div>
    </div>
    <div class="p-3">
      <div class="grid grid-cols-2 gap-2 p-3 rounded-lg bg-blue-600">
        <div class="text-center border-r">
          <h1 class="text-3xl text-white font-bold">0</h1>
          <span class="text-xs text-white"> Pengunjung Kemarin </span>
        </div>
        <div class="text-center">
          <h1 class="text-3xl text-white font-bold">0</h1>
          <span class="text-xs text-white"> Pengunjung Hari Ini </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
