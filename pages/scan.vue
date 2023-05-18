<template>
  <div class="h-screen flex">
    <NuxtLink
      to="/"
      class="absolute top-3 left-3 z-[999] text-gray-600 h-10 w-10 flex items-center justify-center rounded-full bg-white"
    >
      <Icon name="ic:round-arrow-back" size="24" />
    </NuxtLink>

    <div class="min-h-screen">
      <scan-code />
    </div>

    <div class="absolute bottom-0 left-0 w-full">
      <div
        v-if="isSiklusmode === 'barcode'"
        class="rounded-full p-3 text-white border border-white w-1/2 mx-auto mb-4"
      >
        Input Barcode Manual
      </div>
      <div class="p-3 rounded-full grid grid-cols-2 text-white">
        <div
          @click.prevent="mode = 'qr'"
          class="text-center border-r border-white"
        >
          <icon name="ri:qr-scan-2-fill" size="48" />
          <span class="block text-xs"> Scan QrCode </span>
        </div>
        <div
          @click.prevent="isSiklus ? (mode = 'barcode') : (showPop = true)"
          class="text-center"
        >
          <icon name="ri:qr-scan-line" size="48" />
          <span class="block text-xs"> Scan Barcode </span>
        </div>
      </div>
    </div>

    <popup-default :show="showPop" @closed="showPop = false">
      <div class="text-center">
        <Icon
          name="solar:notification-lines-remove-bold"
          size="64"
          class="text-red-600"
        />
        <div class="h-4"></div>
        <h1 class="font-bold text-gray-600 text-lg">Belum masuk siklus</h1>
        <p class="p-3 text-sm text-gray-500">
          Silahkan scan QR siklus<br />
          untuk proses peminjaman buku !
        </p>
      </div>
    </popup-default>
  </div>
</template>

<script setup>
import { useSiklus } from "../store/siklus";
definePageMeta({
  middleware: "auth",
});
const mode = ref("qr");
const siklus = useSiklus();
const showPop = ref(false);
const isSiklus = ref(false);
siklus.checkSiklus().then((x) => {
  console.log(x);
  if (!x.success) {
    showPop.value = true;
    isSiklus.value = false;
  } else {
    isSiklus.value = true;
  }
});
</script>
