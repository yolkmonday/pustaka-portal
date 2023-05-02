<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between">
      <p class="font-bold">List Payment Channel</p>
    </div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-200">
          <tr class="text-xs">
            <td class="p-4">#ID</td>
            <td class="p-4">Nama</td>

            <td class="p-4">Status</td>
            <td class="p-4">
              <p>Tgl dibuat</p>
              <p>Tgl diubah</p>
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody v-if="kategori.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>
        <tbody v-if="!kategori.loading && kategori.error">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p>{{ kategori.error }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!kategori.loading && kategori.data.length">
          <tr
            v-for="(m, i) in kategori.data"
            :key="i"
            class="tr"
          >
            <td class="p-4">
              <NuxtLink
                :to="`/payment/kategori/${m.id}`"
                class="text-primary"
              >#{{ m.id }}</NuxtLink>
            </td>
            <td class="p-4">
              <div>
                <span class="block">{{ m.name }}</span>
              </div>
            </td>
            <td>
              <p
                :class="
                  m.status === 1
                    ? 'bg-green-100 text-green-500'
                    : m.status === 0
                    ? 'bg-red-100 text-red-500'
                    : 'bg-orange-100 text-orange-500'
                "
                class="rounded-full px-3 w-max py-1"
              >
                {{ m.status ? "Aktif" : "Non-Aktif" }}
              </p>
            </td>
            <td class="p-4">
              <p>{{ useMomentDate(m.created_at) }}</p>
              <p>{{ useMomentDate(m.updated_at) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useKategori } from "@/store/kategori";

definePageMeta({
  middleware: "auth",
});

const kategori = useKategori();
const dataEdit = ref({});

kategori.getData();
</script>
