<template>
  <div class="max-w-[600px] min-h-screen mx-auto">
    <div
      class="px-3 border-b justify-between pt-2 font-bold pb-2 text-lg flex items-center gap-1 text-gray-600"
    >
      <div>
        <NuxtLink
          to="/search"
          class="text-gray-600 flex items-center justify-center gap-2"
        >
          <Icon name="ic:round-arrow-back" size="24" />
          Detail Buku
        </NuxtLink>
      </div>
      <div>
        <Icon name="ph:basket" size="23" />
      </div>
    </div>

    <div class="px-3 mt-20">
      <div v-if="!book.loading">
        <!-- {{ bk }} -->
        <div class="mb-2">
          <span class="text-gray-500 text-xs">Judul</span>
          <h1 class="font-bold text-lg">
            {{ bk.title }}
          </h1>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <div v-if="bk.edition" class="mb-2">
            <span class="text-gray-500 text-xs">Edisi</span>
            <h1 class="font-bold text-lg">
              {{ bk.edition }}
            </h1>
          </div>
          <div v-if="bk.isbn_issn" class="mb-2">
            <span class="text-gray-500 text-xs">ISBN / ISSN</span>
            <h1 class="font-bold text-lg">
              {{ bk.isbn_issn }}
            </h1>
          </div>
        </div>
        <div class="mb-2">
          <span class="text-gray-500 text-xs">Penulis</span>
          <h1 class="font-bold">
            {{ bk.author.author_name }}
          </h1>
        </div>
        <div class="mb-2">
          <span class="text-gray-500 text-xs">Klasifikasi | Call Number </span>
          <h1 class="font-bold">
            {{ bk.classification }} | {{ bk.call_number }}
          </h1>
        </div>

        <div class="grid grid-cols-2 gap-2">
          <div class="mb-2">
            <span class="text-gray-500 text-xs">Penerbit </span>
            <h1 class="font-bold">
              {{ bk.publisher_name }}
            </h1>
          </div>
          <div class="mb-2">
            <span class="text-gray-500 text-xs">Tahun Terbit </span>
            <h1 class="font-bold">
              {{ bk.publish_year }}
            </h1>
          </div>
        </div>

        <div class="mb-2" v-if="!loadingItem">
          <span class="text-gray-500 text-xs">Eksemplar Buku</span>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="(it, i) in bk.items"
              :key="i"
              class="border-2 rounded-lg p-2 bg-gray-50 relative"
            >
              <div
                class="absolute top-0 right-0 px-2 py-1 text-[10px] rounded-bl-lg rounded-tr-lg"
                :class="
                  it.status === 'tidak tersedia'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-green-100 text-green-600'
                "
              >
                {{ it.status }}
              </div>

              <div class="text-sm flex items-center gap-1">
                <icon name="solar:bookmark-circle-bold" class="text-blue-600" />
                <span class="font-bold">
                  {{ it.item_code }}
                </span>
              </div>
              <div class="text-sm flex items-center gap-1">
                <icon name="solar:gps-bold" class="text-blue-600" />
                {{ useLocation(it.location_id) }}
              </div>

              <div v-if="it.loan_data" class="text-[10px] mt-1 text-gray-500">
                <div class="mb-1">
                  Dipinjam Oleh<br />
                  <span class="font-bold">
                    {{ it.loan_data.name }}
                  </span>
                </div>
                <span>
                  Akan dikembalikan pada<br />
                  <span class="font-bold">
                    {{ useMomentHari(it.loan_data.loan.return_date) }}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <loader v-if="loadingItem" />
      </div>
    </div>
    <loader-full v-if="book.loading" />
  </div>
</template>


<script setup>
import { useBook } from "@/store/book";
definePageMeta({
  middleware: "auth",
});
const book = useBook();
const route = useRoute();
const bk = ref({});
const loadingItem = ref(true);

book.bookDetail(route.params.id).then((b) => {
  bk.value = b.data;
  if (b.data.items.length) {
    b.data.items.forEach((it, index) => {
      setTimeout(() => {
        book.bookCheck(it.item_code).then((cd) => {
          loadingItem.value = true;

          if (cd.success) {
            it.status = "tersedia";
          } else {
            it.status = "tidak tersedia";
            it.loan_data = cd.message.data;
          }
          loadingItem.value = false;
        });
      }, 200 * index);
    });
  }
});
</script>
