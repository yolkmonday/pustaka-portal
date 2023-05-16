<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div class="px-3">
      <div class="mt-2 flex justify-between items-center">
        <div class="text-sm">
          Halo,
          <span class="text-blue-600">
            {{ auth.data.nama }}
          </span>
          !
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
        <form class="w-full flex gap-2">
          <input
            type="text"
            placeholder="Cari koleksi ..."
            class="rounded-lg h-10 w-full px-2 outline-none border-2 focus:border-blue-600"
          />
          <button
            type="submit"
            class="rounded-lg bg-blue-600 h-10 border-2 border-blue-600 text-white w-32"
          >
            Cari
          </button>
        </form>
      </div>
      <div class="bg-blue-600 p-2 rounded-lg"></div>
    </div>
    <bottom-menu />
  </div>
</template>

<script setup>
import { useAuth } from "@/store/auth";
definePageMeta({
  middleware: "auth",
});
const auth = useAuth();

// const user =
</script>
