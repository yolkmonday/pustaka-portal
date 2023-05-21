
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
      <!--  -->
      <!-- {{ order.detail }} -->
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
order.getDetail(route.params.id);
</script>
