<template>
  <div class="rounded-lg h-screen">
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
import { useSiklus } from "@/store/siklus";
import { usePopup } from "@/store/popup";
import { useBook } from "@/store/book";
import { useCart } from "@/store/cart";

const siklus = useSiklus();
const popup = usePopup();
const book = useBook();
const cart = useCart();
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

const scanBuku = (code) => {
  book.byItemCode(code).then((x) => {
    if (!x.success) {
      popup.setPopup(x.message, !x.success);
    } else {
      cart.addToCart(x.data.item_code, x.data.biblio_id).then((y) => {
        popup.setPopup(y.message, !y.success);
      });
    }
  });
};
</script>
