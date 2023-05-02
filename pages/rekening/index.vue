<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between">
      <p class="font-bold">List Rekening</p>
    </div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-300">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">Merchant ID</td>
            <td class="py-4 px-4">Nama Toko</td>
            <td class="py-4 px-4">
              <p>Email</p>
              <p>No HP</p>
            </td>
            <td class="py-4 px-4">Saldo</td>
            <td class="py-4 px-4">
              <p>Tgl dibuat</p>
              <p>Tgl diubah</p>
            </td>
          </tr>
        </thead>
        <tbody v-if="rekening.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>
        <tbody v-if="!rekening.loading">
          <tr class="text-sm">
            <td colspan="14" class="text-center p-4">
              <p>{{ rekening.error }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!rekening.loading && rekening.data.length">
          <tr v-for="(m, i) in rekening.data" :key="i" class="tr">
            <td class="p-4">#{{ m.id }}</td>
            <td class="p-4">{{ m.merchant_id }}</td>
            <td class="p-4">{{ m.nama_toko }}</td>
            <td class="p-4">
              <p>{{ m.email }}</p>
              <p>{{ m.no_hp }}</p>
            </td>
            <td class="p-4">{{ $rupiah(m.saldo) }}</td>
            <td class="p-4">
              <p>{{ m.created_at }}</p>
              <p>{{ m.updated_at }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex-pagin">
      <div>
        <button
          :disabled="page === 1"
          :class="page === 1 ? 'text-gray-500' : ''"
          class="focus:outline-none"
          @click.prevent="page = page - 1"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        {{ page }}
        <button class="focus-outline-none" @click.prevent="page = page + 1">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div>
        <input
          v-model="page"
          class="border rounded-md focus:outline-none px-3 py-1 text-sm w-20 mr-2 focus:border-bk-blue"
        />
        <select
          v-model="limit"
          class="border rounded-md focus:outline-none px-3 py-1 focus:border-bk-blue"
        >
          <option :value="30">30/page</option>
          <option :value="50">50/page</option>
          <option :value="100">100/page</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRekening } from "@/store/rekening";
definePageMeta({
  middleware: "auth",
});
const rekening = useRekening();
const payload = {
  is_approve: 0,
  status: 0,
};

rekening.getData(payload);
</script>
