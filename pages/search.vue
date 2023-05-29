<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div
      class="px-3 border-b justify-between pt-2 font-bold pb-2 text-lg flex items-center gap-1 text-gray-600"
    >
      <div>
        <NuxtLink
          to="/"
          class="text-gray-600 flex items-center justify-center gap-2"
        >
          <Icon name="ic:round-arrow-back" size="24" />
          Cari Koleksi
        </NuxtLink>
      </div>
      <div @click.prevent="router.push('/keranjang')">
        <Icon name="ph:basket" size="23" />
      </div>
    </div>
    <div class="px-3">
      <div class="py-2">
        <form
          class="w-full flex gap-2"
          @submit.prevent="book.getData(payload.c, payload.q, 10, 1)"
        >
          <input
            type="text"
            v-model="payload.q"
            placeholder="Cari koleksi ..."
            class="rounded-lg h-10 w-full px-2 outline-none border-2 focus:border-blue-600"
          />
          <button
            type="submit"
            class="rounded-lg bg-blue-600 h-10 border-2 border-blue-600 text-white w-32"
          >
            <Icon name="ic:round-search" size="20" />

            Cari
          </button>
        </form>
      </div>
      <!-- <div class="grid grid-cols-2 pb-3">
        <div
          class="text-xs font-bold text-center py-2 border-b-2"
          :class="
            payload.c !== 'kil'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-400'
          "
          @click.prevent="
            (payload.c = 'collection'),
              book.getData(payload.c, payload.q, 10, 1)
          "
        >
          Buku
        </div>
        <div
          class="text-xs font-bold text-center py-2 border-b-2"
          :class="
            payload.c === 'kil'
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-400'
          "
          @click.prevent="
            (payload.c = 'kil'), book.getData(payload.c, payload.q, 10, 1)
          "
        >
          Karya Ilmiah
        </div>
      </div> -->

      <div v-if="book.loading">
        <loader />
      </div>

      <!-- {{ book.data.totalHits }} -->

      <div v-if="!book.loading" class="grid grid-cols-1 gap-3">
        <div
          v-for="(b, i) in book.data.hits"
          :key="i"
          class="border rounded-lg cursor-pointer p-3 flex gap-2 relative"
        >
          <div
            @click.prevent="
              router.push(
                b.type === 'karya ilmiah'
                  ? '/kir/' + b.biblio.biblio_id
                  : '/book/' + b.biblio.biblio_id
              )
            "
            class="w-4/12"
          >
            <p
              v-if="!b.biblio.image"
              class="h-28 capitalize text-blue-600 rounded-lg w-20 break-all bg-blue-50 text-[7px] flex items-center text-center p-4"
            >
              {{ b.biblio.title.slice(0, 50) }}...
            </p>
            <img
              v-if="b.biblio.image"
              onerror="this.onerror=null;this.src='https://static.rsmurniteguh.app/img_assets/not_found.png';"
              class="h-28 w-20 object-cover rounded-lg"
              :src="`https://assets.mainlibapp.com/${b.biblio.image}`"
              alt=""
            />
          </div>
          <div
            @click.prevent="
              router.push(
                b.type === 'karya ilmiah'
                  ? '/kir/' + b.biblio.biblio_id
                  : '/book/' + b.biblio.biblio_id
              )
            "
            class="w-full"
          >
            <div class="flex gap-2">
              <div class="text-[12px] text-gray-500 flex items-center">
                <Icon name="solar:book-bold" />
                <span> {{ b.item.length }} </span>
              </div>
              <div class="text-[12px] text-gray-500 flex items-center gap-1">
                <Icon name="solar:folder-open-bold" />
                <span class="capitalize"> {{ b.type }} </span>
              </div>
            </div>
            <div class="text-[12px] text-gray-500 flex items-center gap-1">
              <Icon name="solar:user-circle-bold" />
              <span>
                {{ b.author.author_name }}
              </span>
            </div>

            <p class="font-bold capitalize block mt-1 text-sm">
              {{ b.biblio.title }}
            </p>
          </div>

          <button
            @click.prevent="addWishlist(0, b.biblio.biblio_id, b)"
            class="absolute bottom-0 right-0 text-red-500 text-xs p-3 flex items-center gap-1"
          >
            <Icon name="mdi:cards-heart" />
            Favoritkan
          </button>

          <!-- <div v-for="(x, y) in b.item">{{ x }}</div> -->
        </div>
      </div>

      <div
        v-if="!book.loading && !book.data.hits.length"
        class="flex justify-center items-center h-40"
      >
        Data tidak ditemukan
      </div>
    </div>
    <book-detail
      :biblio="selectedBook"
      @closed="selectedBook = { biblio: {} }"
    />
    <div class="h-20"></div>
    <loader-full v-if="book.loadingWishlist" />
    <!-- <bottom-menu /> -->
  </div>
</template>

<script setup>
import { useBook } from "../store/book";
import _ from "lodash";
import { usePopup } from "../store/popup";
const route = useRoute();
const router = useRouter();

const book = useBook();
const popup = usePopup();
const loading = ref(false);
definePageMeta({
  middleware: "auth",
});
const payload = reactive({
  c: "collection",
  q: "",
  limit: 10,
  page: 1,
});

const selectedBook = ref({ biblio: {} });

watch(
  payload,
  (a, b) => {
    if (payload.q) {
      route.query.q = payload.q;
    }
  },
  { deep: true }
);

watch(
  route,
  (a, b) => {
    console.log(a);
  },
  { deep: true }
);
const addWishlist = async (wishlist_id, biblio_id, data) => {
  await book.addToWishlist(wishlist_id, biblio_id, data);
  if (book.response) {
    console.log(book.response);
    popup.setPopup(book.response.data.message, !book.response.data.success);
  }
};
book.getData(payload.c, payload.q, payload.limit, payload.page);
</script>
