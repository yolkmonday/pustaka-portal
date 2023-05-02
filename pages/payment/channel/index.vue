<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between items-center">
      <p class="font-bold">List Payment Channel</p>
      <NuxtLink
        to="/payment/channel/form"
        class="btn-primary px-4"
      >
        <i class="fas fa-plus"></i> Tambah Payment Channel
      </NuxtLink>
    </div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-200">
          <tr class="text-xs">
            <td class="p-4">#ID</td>
            <td class="p-4">Nama</td>
            <td class="p-4">
              <p>Kode</p>
              <p>Kode Vendor</p>
            </td>
            <td class="p-4">
              <p>Vendor</p>
              <p>Tipe</p>
            </td>
            <td class="p-4">Biaya Admin User</td>
            <td class="p-4">Biaya Admin Vendor</td>
            <td class="p-4">Proses Di Weekend</td>
            <td class="p-4">Status</td>
            <td class="p-4">
              <p>Tgl dibuat</p>
              <p>Tgl diubah</p>
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody v-if="paymentChanel.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>
        <tbody v-if="!data.length && !paymentChanel.loading">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p>Data Not Found</p>
              <p class="text-xs">{{ paymentChanel.error }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!paymentChanel.loading && paymentChanel.data.length">
          <tr
            v-for="(m, i) in data"
            :key="i"
            class="tr"
          >
            <td class="p-4">
              <NuxtLink
                :to="`/payment/channel/${m.id}`"
                class="text-primary"
              >#{{ m.id }}</NuxtLink>
            </td>
            <td class="p-4">
              <div>
                <img
                  :src="m.logo"
                  class="h-4 mb-2"
                  alt=""
                />
                <span class="block">{{ m.name }}</span>
              </div>
            </td>
            <td class="p-4">
              <p>
                {{ m.kode }}
              </p>
              <p class="text-gray-500">
                {{ m.vendor_kode }}
              </p>
            </td>

            <td class="p-4">
              <p>{{ m.vendor }}</p>
              <p class="text-gray-600 text-[10px]">{{ m.tipe }}</p>
            </td>
            <td class="p-4">
              <p>{{ useRupiah(m.admin_flat_user) }}</p>
              <p>{{ m.admin_persen_user }}%</p>
            </td>
            <td class="p-4">
              <p>{{ useRupiah(m.admin_flat_vendor) }}</p>
              <p>{{ m.admin_persen_vendor }}%</p>
            </td>
            <td class="p-4">
              <p
                :class="m.is_weekend ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'"
                class="w-max rounded-full px-3 py-1"
              >{{ m.is_weekend ? 'Ya' : 'Tidak' }}</p>
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
            <td class="p-4">
              <NuxtLink
                :to="`/payment/channel/form?id=${m.id}`"
                class="text-primary mt-6"
              >
                <i class="fas fa-edit"></i> Edit
              </NuxtLink>
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
import { usePaymentChanel } from "@/store/payment-chanel";
definePageMeta({
  middleware: "auth",
});

const paymentChanel = usePaymentChanel();
const paging = reactive({
  page: 1,
  limit: 30,
});

const data = computed(() => {
  let dt;
  if (paging.page === 1) {
    dt = paymentChanel.data.slice(0, paging.limit);
  } else {
    dt = paymentChanel.data.slice(
      (paging.page - 1) * paging.limit,
      paging.page * paging.limit
    );
  }
  if (paging.page > 1 && !dt.length) {
    return paymentChanel.getDataPaging({ ...payload, mode: "next" });
  }
  return dt;
});

const payload = {
  vendor: "",
  kode: "",
  limit: 300,
};
paymentChanel.getDataPaging(payload);
</script>
