<template>
  <div class="max-w-[600px] min-h-screen mx-auto">
    <div>
      <NuxtLink
        to="/search"
        class="absolute top-3 left-3 z-[999] text-gray-600 h-10 w-10 flex items-center justify-center rounded-full bg-white"
      >
        <Icon name="ic:round-arrow-back" size="24" />
      </NuxtLink>
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
          <div class="mb-2" v-if="bk.publisher_name">
            <span class="text-gray-500 text-xs">Penerbit </span>
            <h1 class="font-bold">
              {{ bk.publisher_name }}
            </h1>
          </div>
          <div class="mb-2" v-if="bk.publish_year">
            <span class="text-gray-500 text-xs">Tahun Terbit </span>
            <h1 class="font-bold">
              {{ bk.publish_year }}
            </h1>
          </div>
        </div>

        <div class="mb-2">
          <span class="text-gray-500 text-xs">Eksemplar</span>

          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="(it, i) in bk.items"
              :key="i"
              class="border-2 rounded-lg p-2"
            >
              <span class="font-bold"> #{{ it.item_code }} </span>
              <span class="text-xs block">
                {{ useLocation(it.location_id) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader-full v-if="book.loading" />
  </div>
</template>


<script setup>
import { useKir } from "@/store/kir";
definePageMeta({
  middleware: "auth",
});
const book = useKir();
const route = useRoute();
const bk = ref({});
book.bookDetail(route.params.id).then((b) => {
  bk.value = b.data;
});
</script>
