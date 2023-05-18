<template>
  <div class="rounded-lg">
    <ClientOnly>
      <StreamBarcodeReader
        @decode="onDecode"
        @loaded="onLoaded"
        class="rounded-lg w-screen h-screen"
      ></StreamBarcodeReader>
    </ClientOnly>
  </div>
</template>

<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";

const onDecode = (val) => {
  if (val.includes("siklus")) {
    masukSiklus();
  } else {
    scanBuku();
  }
};
</script>
