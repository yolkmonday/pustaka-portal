<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between">
      <p class="font-bold">List Transaksi</p>
    </div>
    <div class="grid-4 px-4">
      <input
        v-model="payload.merchant_id"
        type="text"
        class="form-input"
        placeholder="Merchant ID"
      />
      <input
        v-model="payload.trx_id"
        type="text"
        class="form-input"
        placeholder="TRX ID"
      />
      <input
        v-model="payload.reff_id"
        type="text"
        class="form-input"
        placeholder="REF ID"
      />
      <select
        v-model="payload.vendor_id"
        class="form-input"
      >
        <option
          value=""
          selected
        >Vendor</option>
        <option
          v-for="(v, i) in vendor.data"
          :value="v.id"
          :key="i"
        >
          {{ v.name }}
        </option>
      </select>
      <select
        v-model="payload.kategori_id"
        class="form-input"
      >
        <option
          value=""
          selected
        >Kategori</option>
        <option
          v-for="(k, i) in kategori.data"
          :value="k.id"
          :key="i"
        >
          {{ k.name }}
        </option>
      </select>
      <select
        v-model="payload.status"
        class="form-input"
      >
        <option
          value=""
          selected
        >Semua Status</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Failed">Failed</option>
        <option value="Success">Success</option>
      </select>
      <select
        v-model="payload.kode_channel"
        class="form-input"
      >
        <option
          value=""
          selected
        >Chanel</option>
        <option
          v-for="(c, i) in chanel.data"
          :value="c.kode"
          :key="i"
        >
          {{ c.name }}
        </option>
      </select>
      <div class="flex gap-2">
        <button
          class="btn-primary w-full"
          @click.prevent="
            (page = 1), transaksi.getData({ ...payload, mode: 'filter' })
          "
        >
          <i class="fas fa-search"></i> Cari
        </button>
        <button
          class="btn-secondary w-full"
          @click.prevent="
            (page = 1),
              (payload.trx_id = ''),
              (payload.merchant_id = ''),
              (payload.kode_channel = ''),
              (payload.reff_id = ''),
              (payload.vendor_id = ''),
              (payload.kategori_id = ''),
              (payload.status = ''),
              transaksi.getData({ ...payload, mode: '' })
          "
        >
          <i class="fas fa-redo"></i> Reset
        </button>
      </div>
    </div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-200">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">
              <p>Trx ID</p>
              <p>Ref ID</p>
            </td>
            <td class="py-4 px-4">Merchant ID</td>
            <td class="py-4 px-4">
              <p>Kategori</p>
              <p>Chanel</p>
            </td>
            <td class="py-4 px-4">Nominal</td>
            <td class="py-4 px-4">
              <p>Biaya Admin</p>
              <p>Biaya Admin Vendor</p>
            </td>
            <td class="py-4 px-4">
              <p>Jumlah Bayar</p>
              <p>Jumlah Diterima</p>
            </td>
            <td class="py-4 px-4">
              <p>Vendor</p>
            </td>
            <td class="py-4 px-4">
              <p>Status</p>
            </td>
            <td class="py-4 px-4">
              <p>Tgl Dibuat</p>
              <p>Tgl Diedit</p>
            </td>
          </tr>
        </thead>
        <tbody v-if="transaksi.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>

        <tbody v-if="!transaksi.loading && transaksi.data">
          <tr
            v-for="(m, i) in data"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{ m.id }}</td>
            <td class="p-4">
              <NuxtLink
                :to="`/transaksi/${m.trx_id}`"
                class="text-primary"
              >{{
                m.trx_id
              }}</NuxtLink>
              <p>{{ m.reff_id }}</p>
            </td>
            <td class="p-4">
              <NuxtLink
                :to="`/merchant/${m.merchant_id}`"
                class="text-primary"
              >{{ m.merchant_id }}</NuxtLink>
            </td>
            <td class="p-4">
              <p>{{ m.kategori_name }}</p>
              <p>{{ m.kode_channel }}</p>
            </td>
            <td class="p-4">{{ useRupiah(m.nominal) }}</td>
            <td class="p-4">
              <div class="flex items-center gap-2 justify-between">
                <div>
                  <p>{{ useRupiah(m.biaya_admin) }}</p>
                  <p>{{ useRupiah(m.biaya_admin_vendor) }}</p>
                </div>
                <div>
                  <p class="px-2 py-1 text-xs rounded-full text-green-600 bg-green-100">
                    +{{ useRupiah(m.profit) }}
                  </p>
                </div>
              </div>
            </td>
            <td class="p-4">
              <p>{{ useRupiah(m.jumlah_bayar) }}</p>
              <p>{{ useRupiah(m.jumlah_diterima) }}</p>
            </td>
            <td class="p-4">
              <p>{{ m.vendor_kode }}</p>
              <p>{{ m.vendor_name }}</p>
            </td>
            <td class="p-4">
              <p
                :class="
                  m.status === 'Failed'
                    ? 'bg-red-100 text-red-500'
                    : m.status === 'Success'
                    ? 'bg-green-100 text-green-500' : m.status === 'Unpaid' ? 'bg-orange-100 text-orange-500' :  'bg-blue-100 text-blue-5000'
                 "
                class="rounded-full px-3 w-max py-1"
              >
                {{ m.status }}
              </p>
            </td>
            <td class="p-4">
              <p>{{ useMomentUnix(m.created_at_unix) }}</p>
              <p>{{ useMomentUnix(m.updated_at_unix) }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!data.length && !transaksi.loading">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p>Data Not Found</p>
              <p class="text-xs">{{ transaksi.error }}</p>
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

    <!-- <ClientOnly>
      <Select2
        v-model="myValue"
        :options="myOptions"
        :settings="{  }"
        @change="myChangeEvent($event)"
        @select="mySelectEvent($event)"
      />

    </ClientOnly> -->
  </div>
</template>

<script setup>
import { useTransaksi } from "@/store/transaksi";
import { useVendor } from "@/store/vendor";
import { useKategori } from "@/store/kategori";
import { usePaymentChanel } from "@/store/payment-chanel";
definePageMeta({
  middleware: "auth",
});
const props = defineProps({
  id: { type: [String] },
});
const transaksi = useTransaksi();
const vendor = useVendor();
const kategori = useKategori();
const chanel = usePaymentChanel();
const paging = reactive({
  page: 1,
  limit: 30,
});

const data = computed(() => {
  let dt;
  if (paging.page === 1) {
    dt = transaksi.data.slice(0, paging.limit);
  } else {
    dt = transaksi.data.slice(
      (paging.page - 1) * paging.limit,
      paging.page * paging.limit
    );
  }
  if (paging.page > 1 && !dt.length) {
    return transaksi.getData({ ...payload, mode: "next" });
  }
  return dt;
});

const payload = {
  trx_id: "",
  reff_id: "",
  merchant_id: "",
  kode_channel: "",
  kategori_id: "",
  vendor_id: "",
  status: "",
  limit: 300,
};

transaksi.getData(payload);
vendor.getData();
kategori.getData();
chanel.getData();

// const myChangeEvent = (event) => {
//   console.log("myChangeEvent: ", event);
// };
// const mySelectEvent = (e) => {
//   console.log("mySelectEvent: ", e);
// };
// const myOptions = [
//   { id: 1, text: "apple fsggsgsger" },
//   { id: 2, text: "berry tretertre" },
//   { id: 3, text: "cherry tretretr" },
// ];
// const myValue = ref();
</script>
