<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div class="px-3">
      <div class="my-4 flex justify-between items-center">
        <div
          @click.prevent="router.push('/profil')"
          class="text-lg flex items-center"
        >
          <Icon name="solar:user-circle-bold" size="24" />
          <span class="text-blue-600 font-bold">
            {{ auth.data.nama }}
          </span>
        </div>
        <div>
          <div class="relative" @click.prevent="router.push('/keranjang')">
            <Icon name="ph:basket" size="26" class="mr-2" />
            <div
              v-if="cart.data.length"
              class="w-5 h-5 absolute top-1 right-0 bg-red-500 flex items-center justify-center text-[10px] text-white rounded-full"
            >
              {{ cart.data.length }}
            </div>
          </div>
        </div>
      </div>

      <div class="py-2">
        <form
          class="w-full flex gap-2"
          @submit.prevent="router.push('/search?q=' + search)"
        >
          <input
            type="text"
            v-model="search"
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

      <div
        v-if="auth.me.is_verified_ktp"
        class="flex gap-2 my-2 items-center rounded-lg bg-red-100 text-red-600 p-2"
      >
        <Icon name="clarity:times-circle-solid" size="14" />
        <span class="text-xs">Akun belum di verifikasi</span>
      </div>
      <div class="p-4 rounded-lg grid grid-cols-3 gap-8">
        <div class="text-center" @click.prevent="router.push('/scan')">
          <img class="h-20 mx-auto mb-1" src="/pinjaman.png" alt="" />
          <div class="w-full text-center font-bold text-gray-600 text-xs">
            Peminjaman
          </div>
        </div>
        <div class="text-center">
          <img
            class="h-20 mx-auto mb-1"
            src="/pesan-buku.png"
            alt=""
            @click.prevent="router.push('/search')"
          />
          <div class="w-full text-center font-bold text-gray-600 text-xs">
            Pesan Buku
          </div>
        </div>
        <div class="text-center" @click.prevent="router.push('/search')">
          <img class="h-20 mx-auto mb-1" src="/portal.png" alt="" />
          <div class="w-full text-center font-bold text-gray-600 text-xs">
            Portal
          </div>
        </div>
        <div class="text-center" @click.prevent="router.push('/tugas-akhir')">
          <img class="h-20 mx-auto mb-1" src="/tugas-akhir.png" alt="" />
          <div class="w-full text-center font-bold text-gray-600 text-xs">
            Tugas Akhir
          </div>
        </div>
        <div class="text-center" @click.prevent="router.push('/forum')">
          <img class="h-20 mx-auto mb-1" src="/forum.png" alt="" />
          <div class="w-full text-center font-bold text-gray-600 text-xs">
            Forum
          </div>
        </div>
        <div class="text-center" @click.prevent="router.push('/statistik')">
          <img class="h-20 mx-auto mb-1" src="/statistik.png" alt="" />
          <div class="w-full text-center font-bold text-gray-600 text-xs">
            Statistik
          </div>
        </div>
      </div>

      <div class="py-2 border-t">
        <h1 class="font-bold flex items-center gap-1 text-lg mb-1">
          <icon name="solar:info-square-bold" class="text-blue-600" />
          Informasi
        </h1>
        <slider />
      </div>

      <div class="py-2 border-t">
        <h1 class="font-bold flex items-center gap-1 text-lg mb-1">
          <icon name="solar:help-bold" class="text-blue-600" />
          Panduan
        </h1>
        <div class="grid grid-cols-1 p-1">
          <div>
            <img src="/ill.png" class="rounded-lg" alt="" />
            <div class="font-bold mt-2">Tutorial Scan Buku</div>
            <p class="text-xs text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit...
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="h-40"></div>
    <bottom-menu />
    <popup-default
      :show="showVerified"
      @closed="showVerified = false"
      :clicktoclose="false"
    >
      <div class="text-center">
        <Icon
          name="solar:notification-lines-remove-bold"
          size="64"
          class="text-red-600"
        />
        <div class="h-4"></div>
        <div class="w-full text-center font-bold text-gray-600 text-xs">
          Yaah !<br />Whatsapp kamu belum di verifikasi!
        </div>
        <NuxtLink
          to="/verifikasi/wa"
          class="rounded-full block mb-2 mt-4 border border-blue-600 bg-blue-600 text-white w-full py-3 text-sm transform active:scale-95 transition-transform"
        >
          Verifikasi Sekarang
        </NuxtLink>
      </div>
    </popup-default>
  </div>
</template>

<script setup>
import { useAuth } from "@/store/auth";
import { usePopup } from "@/store/popup";
import { useCart } from "@/store/cart";
definePageMeta({
  middleware: "auth",
});
const router = useRouter();
const auth = useAuth();
const cart = useCart();

const search = reactive("");
const popup = usePopup();
const showVerified = ref(false);

auth.getMe().then((a) => {
  if (a && !a.is_verified_wa) {
    showVerified.value = true;
  }
});

cart.getData();
</script>
