<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between">
      <p class="font-bold">List Merchant</p>
    </div>
    <div class="grid-4 px-4">
      <input
        v-model="payload.merchant_id"
        class="form-input"
        placeholder="Merchant ID"
      />
      <div class="flex gap-2">
        <button
          class="btn-primary w-full"
          @click.prevent="
            (page = 1), merchant.getData({ ...payload, mode: 'filter' })
          "
        >
          <i class="fas fa-search"></i> Cari
        </button>
        <button
          class="btn-secondary w-full"
          @click.prevent="
            (page = 1),
              (payload.merchant_id = ''),
              merchant.getData({ ...payload, mode: '' })
          "
        >
          <i class="fas fa-redo"></i> Reset
        </button>
      </div>
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
            <td class="py-4 px-4">
              <p>Saldo Real</p>
              <p>Saldo Kliring</p>
            </td>
            <td class="py-4 px-4">
              <p>Tgl dibuat</p>
              <p>Tgl diubah</p>
            </td>
          </tr>
        </thead>

        <tbody v-if="merchant.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>

        <tbody v-if="!merchant.loading">
          <tr
            v-for="(m, i) in data"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{ m.id }}
            </td>
            <td class="p-4">
              <NuxtLink
                :to="`/merchant/${m.merchant_id}`"
                class="text-primary"
              >
                {{ m.merchant_id }}
              </NuxtLink>
            </td>
            <td class="p-4">{{ m.nama_toko }}</td>
            <td class="p-4">
              <p>{{ m.email }}</p>
              <p>{{ m.no_hp }}</p>
            </td>
            <td class="p-4">
              <div class="flex items-center gap-x-2">
                <div>
                  <p>{{ useRupiah(m.saldo) }}</p>
                  <p>{{ useRupiah(m.saldo_kliring) }}</p>
                </div>
                <p class="bg-blue-100 text-blue-500 rounded-full m-max px-3 py-1">+ {{ useRupiah(m.saldo + m.saldo_kliring) }}</p>
              </div>
            </td>
            <td class="p-4">
              <p>{{ useMomentDate(m.created_at) }}</p>
              <p>{{ useMomentDate(m.updated_at) }}</p>
            </td>
          </tr>
        </tbody>

        <tbody v-if="!data.length && !merchant.loading">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p>Data Not Found</p>
              <p class="text-xs">{{ merchant.error }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex-pagin">
      <div>
        <button
          :disabled="paging.page === 1"
          :class="paging.page === 1 ? 'text-gray-500' : ''"
          class="focus:outline-none"
          @click.prevent="paging.page = paging.page - 1"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        {{ paging.page }}
        <button
          class="focus-outline-none"
          @click.prevent="paging.page = paging.page + 1"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div>
        <input
          v-model="paging.page"
          class="border rounded-md focus:outline-none px-3 py-1 text-sm w-20 mr-2 focus:border-bk-blue"
        />
        <select
          v-model="paging.limit"
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
import { useMerchant } from "@/store/merchant";

definePageMeta({
  middleware: "auth",
});

const paging = reactive({
  page: 1,
  limit: 30,
});

const data = computed(() => {
  let dt;
  if (paging.page === 1) {
    dt = merchant.data.slice(0, paging.limit);
  } else {
    dt = merchant.data.slice(
      (paging.page - 1) * paging.limit,
      paging.page * paging.limit
    );
  }
  if (paging.page > 1 && !dt.length) {
    return merchant.getData({ ...payload, mode: "next" });
  }
  return dt;
});

const merchant = useMerchant();

const payload = reactive({
  merchant_id: "",
  is_verif: "",
  limit: 300,
  last_id: 0,
});
merchant.getData(payload);
</script>
