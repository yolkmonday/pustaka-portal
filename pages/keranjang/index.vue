<template>
  <div class="max-w-[600px] min-h-screen mx-auto">
    <div
      class="px-3 border-b justify-between pt-2 font-bold pb-2 text-lg flex items-center gap-1 text-gray-600"
    >
      <div>
        <NuxtLink
          to="/"
          class="text-gray-600 flex items-center justify-center gap-2"
        >
          <Icon name="ic:round-arrow-back" size="24" />
          Keranjang
        </NuxtLink>
      </div>
      <div>
        <Icon name="ph:basket" size="23" />
      </div>
    </div>
    <div
      class="h-screen flex items-center justify-center"
      v-if="!cart.loading && !cart.data.length"
    >
      <div class="text-center text-gray-400">
        <icon name="solar:chat-square-like-broken" size="40" class="" />
        <span class="mt-3 block text-sm">Belum ada data</span>
      </div>
    </div>

    <div class="h-screen flex items-center justify-center" v-if="cart.loading">
      <loader />
    </div>

    <div
      v-if="!cart.loading && cart.data.length"
      class="grid grid-cols-1 gap-3 p-3"
    >
      <div
        v-for="(b, i) in cart.data"
        :key="i"
        class="border rounded-lg p-3 flex gap-2 relative"
      >
        <div class="w-4/12">
          <p
            class="h-28 capitalize text-blue-600 rounded-lg w-20 break-all bg-blue-50 text-[7px] flex items-center text-center p-4"
          >
            {{ b.b.title.slice(0, 50) }}...
          </p>
        </div>

        <div class="w-full">
          <div class="flex gap-2">
            <div class="text-[12px] text-gray-500 flex items-center gap-1">
              <Icon name="solar:user-circle-bold" />
              <span>
                {{ b.b.sor }}
              </span>
            </div>
            <div class="text-[12px] text-gray-500 flex items-center gap-1">
              <Icon name="solar:book-bold" />
              <span> {{ b.b.item_code }} </span>
            </div>
          </div>

          <p class="font-bold capitalize block mt-1 text-sm">
            {{ b.b.title }}
          </p>
        </div>

        <button
          @click.prevent="addWishlist(0, b.biblio.biblio_id, b)"
          class="absolute bottom-0 right-0 text-red-500 text-xs p-3 flex items-center gap-1"
        >
          <Icon name="material-symbols:delete-rounded" />
          Hapus
        </button>
      </div>
    </div>
    <div class="fixed bottom-3 w-full left-0 p-3">
      <button
        type="submit"
        class="rounded-full mb-2 border border-blue-600 bg-blue-600 text-white w-full py-3 text-sm transform active:scale-95 transition-transform"
      >
        <icon name="ic:twotone-shopping-cart-checkout" size="24" />
        Selesaikan Peminjaman
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCart } from "@/store/cart";

definePageMeta({
  middleware: "auth",
});

const cart = useCart();
cart.getData();
</script>
