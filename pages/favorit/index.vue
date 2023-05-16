<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div
      class="px-3 pt-2 font-bold text-lg flex items-center gap-1 text-gray-600 text-red-500"
    >
      <Icon name="solar:chat-round-like-bold" size="28" />Favorit
    </div>
    <div
      class="h-screen flex items-center justify-center"
      v-if="!wishlist.loading && !wishlist.data.length"
    >
      <div class="text-center text-gray-400">
        <icon name="solar:chat-square-like-broken" size="40" class="" />
        <span class="mt-3 block text-sm">Belum ada Favorit</span>
      </div>
    </div>

    <div
      class="h-screen flex items-center justify-center"
      v-if="wishlist.loading"
    >
      <loader />
    </div>

    <div
      v-if="!wishlist.loading && wishlist.data.length"
      class="grid grid-cols-1 gap-3 p-3"
    >
      <div
        v-for="(b, i) in wishlist.data"
        :key="i"
        class="border rounded-lg cursor-pointer p-3 flex gap-2 relative"
      >
        <div class="w-4/12">
          <p
            class="h-28 capitalize text-blue-600 rounded-lg w-20 break-all bg-blue-50 text-[7px] flex items-center text-center p-4"
          >
            {{ b.book.biblio.title.slice(0, 50) }}...
          </p>
        </div>

        <div class="w-full">
          <div class="flex gap-2">
            <div class="text-[12px] text-gray-500 flex items-center gap-1">
              <Icon name="solar:user-circle-bold" />
              <span>
                {{ b.book.author.author_name }}
              </span>
            </div>
            <div class="text-[12px] text-gray-500 flex items-center gap-1">
              <Icon name="solar:book-bold" />
              <span> {{ b.book.item.length }} Koleksi </span>
            </div>
          </div>

          <p class="font-bold capitalize block mt-1 text-sm">
            {{ b.book.biblio.title }}
          </p>
        </div>
      </div>
    </div>

    <bottom-menu />
  </div>
</template>

<script setup>
import { useWishlist } from "@/store/wishlist";

definePageMeta({
  middleware: "auth",
});

const wishlist = useWishlist();
wishlist.getData();
</script>
