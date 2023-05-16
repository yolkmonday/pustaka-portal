<template>
  <div>
    <ClientOnly>
      <StreamBarcodeReader
        @decode="onDecode"
        @loaded="onLoaded"
        class="min-h-screen min-w-screen"
      ></StreamBarcodeReader>
    </ClientOnly>
  </div>
</template>

<script setup>
import { StreamBarcodeReader } from "vue-barcode-reader";

const onDecode = (val) => {
  alert(val);
};
</script>
