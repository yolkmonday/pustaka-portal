<template>
  <div class="max-w-[1200px] mx-auto p-3">
    <!-- <div>{{ book.data.hits }}</div> -->
    <form
      @submit.prevent="book.getData(payload.c, payload.q, 10, 1)"
      class="flex w-full gap-3 py-8"
    >
      <input
        type="text"
        v-model="payload.q"
        placeholder="Cari buku, pengarang"
        class="w-full p-2 rounded-md border"
      />
      <select @change.prevent="changeColl" class="p-2 rounded-md border">
        <option value="" selected disabled>Pilih Koleksi</option>
        <option value="biblio">Buku</option>
        <option value="kil">Karya Ilmiah</option>
      </select>

      <button type="submit" class="w-20 bg-blue-500 text-white rounded-lg">
        Cari
      </button>
    </form>

    <div v-if="book.loading">
      <loader />
    </div>

    <div v-if="!book.loading" class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div
        v-for="(b, i) in book.data.hits"
        :key="i"
        class="border rounded-lg p-4"
      >
        <span class="font-bold block">
          {{ b.biblio.title }}
        </span>
        <span class="text-sm text-gray-500 block">
          {{ b.author.author_name }}
        </span>

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
</template>

<script setup>
import { useBook } from "../store/book";
import _ from "lodash";
const route = useRoute();
const book = useBook();

const payload = reactive({
  c: "",
  q: "",
  limit: 10,
  page: 1,
});

const changeColl = (val) => {
  payload.c = val.target.value;
};
book.getData(payload.c, payload.q, payload.limit, payload.page);
</script>
