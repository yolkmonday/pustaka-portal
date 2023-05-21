
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
          Detail Peminjaman
        </NuxtLink>
      </div>
      <div>
        <Icon name="ph:basket" size="23" />
      </div>
    </div>
    <div
      class="h-screen flex items-center justify-center"
      v-if="!order.loading && !order.detail"
    >
      <div class="text-center text-gray-400">
        <icon name="solar:chat-square-like-broken" size="40" class="" />
        <span class="mt-3 block text-sm">Data tidak ditemukan</span>
      </div>
    </div>

    <div class="h-screen flex items-center justify-center" v-if="order.loading">
      <loader />
    </div>

    <div
      v-if="!order.loading && order.detail"
      class="grid grid-cols-1 gap-3 p-3"
    >
      <!-- <qr-code text="Text to encode"></qr-code> -->
      <!-- {{ order.detail }} -->
      <div v-if="!isExpired">
        <div class="rounded-t-lg bg-red-100 text-red-500 p-3 text-center">
          Peminjaman akan kadaluarsa dalam<br />
          <strong class="text-xl">
            {{ useMomentNow(order.detail.expired_at) }}
          </strong>
          <br />
        </div>
        <div
          class="mb-3 rounded-b-lg bg-orange-100 text-sm text-orange-500 p-3"
        >
          Segera menuju tunjukkan QR Code kepeda petugas untuk selesaikan
          peminjaman
        </div>
      </div>

      <div v-if="isExpired">Peminjaman telah kadaluarsa</div>

      <div class="mb-3">
        <div class="font-bold flex items-center gap-1">
          <icon name="solar:buildings-2-bold" class="text-blue-600" />
          Lokasi Peminjaman
        </div>
        <div class="ml-5">
          {{ useLocation(listBook[0].book_render.location_id) }}
        </div>
      </div>
      <div>
        <div class="font-bold flex items-center gap-1">
          <icon name="solar:bookmark-square-bold" class="text-blue-600" />
          Buku Dipinjam
        </div>
        <div class="flex mt-2">
          <div
            v-for="(pj, i) in listBook"
            :key="i"
            class="p-2 border rounded-lg w-full"
          >
            <span class="text-xs block text-gray-600">
              Item Code #{{ pj.book_render.item_code }}
            </span>
            <span class="text-sm font-bold">
              {{ pj.book_render.title }}
              <!-- {{ pj.book_render }} -->
            </span>
          </div>
        </div>
      </div>
    </div>

    <loader-full v-if="order.loading" />
  </div>
</template>

<script setup>
import { useOrder } from "@/store/order";
import moment from "moment";
definePageMeta({
  middleware: "auth",
});

const order = useOrder();
const route = useRoute();
const listBook = computed((x) => {
  order.detail.order_item.forEach((y) => {
    y.book_render = JSON.parse(y.book);
  });
  return order.detail.order_item;
});

const isExpired = computed((val) => {
  const now = moment().unix();
  const expired = moment(val).unix();
  if (now > expired) {
    return true;
  } else {
    return false;
  }
});
order.getDetail(route.params.id);
</script>
