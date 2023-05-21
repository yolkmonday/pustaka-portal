<template>
  <div class="h-screen flex">
    <NuxtLink
      to="/"
      class="absolute top-3 left-3 z-[999] text-gray-600 h-10 w-10 flex items-center justify-center rounded-full bg-white"
    >
      <Icon name="ic:round-arrow-back" size="24" />
    </NuxtLink>

    <div class="min-h-screen" v-if="!siklus.loading">
      <scan-code />
      <!-- <scan-qr /> -->
    </div>

    <div class="absolute bottom-0 left-0 w-full" v-if="!siklus.loading">
      <div
        v-if="mode === 'barcode'"
        @click.prevent="showInput = true"
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

    <popup-default :show="showInput" @closed="showInput = false">
      <div>
        <form class="text-center" @submit.prevent="scanBuku()">
          <icon
            name="material-symbols:barcode"
            size="96"
            class="text-blue-600"
          />
          <p>Masukkan Kode Barcode</p>
          <input
            type="text"
            v-model="barcode"
            required
            placeholder="Masukkan kode barcode"
            class="w-full border my-3 p-3 rounded-lg"
          />
          <button
            type="submit"
            :disabled="loading"
            class="rounded-full mb-2 border border-blue-600 bg-blue-600 text-white w-full py-3 text-sm transform active:scale-95 transition-transform"
          >
            Cek Buku
          </button>
        </form>
      </div>
    </popup-default>
    <loader-full v-if="loading || siklus.loading" />
  </div>
</template>

<script setup>
import { useBook } from "../store/book";
import { useCart } from "../store/cart";
import { usePopup } from "../store/popup";
import { useSiklus } from "../store/siklus";

definePageMeta({
  middleware: "auth",
});
const mode = ref("qr");
const siklus = useSiklus();
const book = useBook();
const popup = usePopup();
const cart = useCart();
const showPop = ref(false);
const showInput = ref(false);
const isSiklus = ref(false);
const loading = ref(false);
const barcode = ref("");

siklus.checkSiklus().then((x) => {
  if (!x.success) {
    showPop.value = true;
    isSiklus.value = false;
  } else {
    isSiklus.value = true;
  }
});

const scanBuku = () => {
  loading.value = true;
  book.byItemCode(barcode.value).then((x) => {
    showInput.value = false;
    if (!x.success) {
      console.log("tidak sukses");
      loading.value = false;
      popup.setPopup(x.message, !x.success);
    } else {
      cart.addToCart(x.data.item_code, x.data.biblio_id).then((y) => {
        loading.value = false;
        popup.setPopup(y.message, !y.success);
      });
    }
  });
};
</script>
