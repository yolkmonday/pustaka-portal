<template>
  <div class="rounded-lg min-h-screen">
    <ClientOnly>
      <StreamBarcodeReader
        @decode="onDecode"
        @loaded="onLoaded"
        class="rounded-lg w-screen min-h-screen"
      ></StreamBarcodeReader>
    </ClientOnly>
  </div>
</template>

<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";

const onDecode = (val) => {
  if (val.includes("siklus")) {
    masukSiklus(val);
  } else {
    scanBuku(val);
  }
};

const masukSiklus = (code) => {};

const scanBuku = (code) => {};
</script>
