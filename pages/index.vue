<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div class="px-3">
      <div class="my-4 flex justify-between items-center">
        <div class="text-lg flex items-center">
          <Icon name="solar:user-circle-bold" size="24" />
          <span class="text-blue-600 font-bold">
            {{ auth.data.nama }}
          </span>
        </div>
        <div>
          <div class="relative">
            <Icon name="ph:basket" size="26" class="mr-2" />
            <div
              class="w-5 h-5 absolute top-1 right-0 bg-red-500 flex items-center justify-center text-[10px] text-white rounded-full"
            >
              0
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
          <img src="/pinjaman.png" alt="" />
          <span class="font-bold text-gray-600">Peminjaman</span>
        </div>
        <div class="text-center">
          <img
            src="/pesan-buku.png"
            alt=""
            @click.prevent="router.push('/search')"
          />
          <span class="font-bold text-gray-600">Pesan Buku</span>
        </div>
        <div class="text-center" @click.prevent="router.push('/search')">
          <img src="/portal.png" alt="" />
          <span class="font-bold text-gray-600">Portal</span>
        </div>
        <div class="text-center" @click.prevent="router.push('/tugas-akhir')">
          <img src="/tugas-akhir.png" alt="" />
          <span class="font-bold text-gray-600">Tugas Akhir</span>
        </div>
        <div class="text-center" @click.prevent="router.push('/forum')">
          <img src="/forum.png" alt="" />
          <span class="font-bold text-gray-600">Forum</span>
        </div>
        <div class="text-center" @click.prevent="router.push('/statistik')">
          <img src="/statistik.png" alt="" />
          <span class="font-bold text-gray-600">Statistik</span>
        </div>
      </div>
    </div>
    <bottom-menu />
    <popup-default :show="showVerified" @closed="showVerified = false">
      <div class="text-center">
        <Icon
          name="solar:notification-lines-remove-bold"
          size="64"
          class="text-red-600"
        />
        <div class="h-4"></div>
        <h1 class="font-bold text-gray-600">
          Yaah !<br />Whatsapp kamu belum di verifikasi!
        </h1>
        <NuxtLink
          to="/verifikasi/wa"
          class="rounded-full block mb-2 mt-4 border border-blue-600 bg-blue-600 text-white w-full py-3 text-sm transform active:scale-95 transition-transform"
        >
          Verifikasi Sekarang
        </NuxtLink>
        <button
          @click.prevent="showVerified = false"
          class="text-blue-600 mt-2"
        >
          Nanti saja
        </button>
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
  if (!a.is_verified_wa) {
    showVerified.value = true;
  }
});

cart.getData();
</script>
