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
import { useSiklus } from "@/store/siklus";
import { usePopup } from "@/store/popup";
const siklus = useSiklus();
const popup = usePopup();
const onDecode = (val) => {
  alert(val);
  if (val.includes("siklus")) {
    masukSiklus(val);
  } else {
    scanBuku(val);
  }
};

const masukSiklus = (code) => {
  const t = code.split(":", 2);
  siklus.masuk(t[1]).then((x) => {
    popup.setPopup(x.message, !x.success);
  });
};

const scanBuku = (code) => {};
</script>
