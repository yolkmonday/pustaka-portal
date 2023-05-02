<template>
  <div>
    <div class="grid-4">
      <select
        v-model="payload.metode_id"
        class="form-input"
      >
        <option
          value=""
          selected
        >Metode</option>
        <option
          v-for="(m, i) in metode.data"
          :value="m.id"
          :key="i"
        >{{ m.nama }}</option>
      </select>
      <select
        v-model="payload.status"
        class="form-input"
      >
        <option
          value=""
          selected
        >Status</option>
        <option value="pending">Pending</option>
        <option value="sukses">Sukses</option>
        <option value="gagal">Gagal</option>
      </select>
      <div class="flex gap-2">
        <button
          class="btn-primary w-full"
          @click.prevent="page =1 ,penarikan.getData({...payload, mode: 'filter'}) "
        ><i class="fas fa-search"></i> Cari</button>
        <button
          class="btn-secondary w-full"
          @click.prevent="page =1, payload.metode_id = '', payload.status = '', penarikan.getData({...payload, mode: ''})"
        ><i class="fas fa-redo"></i> Reset</button>
      </div>
    </div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-300">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">Metode</td>
            <td class="py-4 px-4">Nominal</td>
            <td class="py-4 px-4">
              <p>Biaya Admin</p>
            </td>
            <td class="py-4 px-4">Total Transfer</td>
            <td class="py-4 px-4">
              <p>Rekening</p>
            </td>
            <td class="py-4 px-4">
              <p>Status</p>
            </td>
            <td class="py-4 px-4">
              <p>Admin ID</p>
            </td>
            <td class="py-4 px-4">
              <p>Tgl Dibuat</p>
              <p>Tgl Diedit</p>
            </td>
          </tr>
        </thead>

        <tbody v-if="penarikan.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>

        <tbody v-if="!penarikan.loading">
          <tr
            v-for="(m, i) in data"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{ m.id }}</td>
            <td class="p-4">{{ m.metode_name }}</td>
            <td class="p-4">{{ useRupiah(m.nominal) }}</td>
            <td class="p-4">{{ useRupiah(m.biaya_admin) }}</td>
            <td class="p-4">{{ useRupiah(m.total_transfer) }}</td>
            <td class="p-4">
              <p>{{ m.rekening }}</p>
              <p>{{ m.rekening_pemilik }}</p>
            </td>
            <td class="p-4">
              <p
                :class="m.status === 'Pending' ? 'bg-orange-100 text-orange-500' : m.status === 'Sukses' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'"
                class="w-max rounded-full px-3 py-1"
              >{{ m.status }}</p>
            </td>
            <td class="p-4">{{ m.admin_id }}</td>
            <td>
              <p>{{ useMomentDate(m.created_at) }}</p>
              <p>{{ useMomentDate(m.updated_at) }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!data.length && !penarikan.loading">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p>Data Not Found</p>
              <p class="text-xs">{{ penarikan.error }}</p>
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
import { usePenarikanSaldo } from "@/store/penarikan-saldo";
import { useMetodePenarikan } from "@/store/metode-penarikan";
const props = defineProps({
  id: { type: [String] },
});

const penarikan = usePenarikanSaldo();
const metode = useMetodePenarikan();
const paging = reactive({
  page: 1,
  limit: 30,
});

const data = computed(() => {
  let dt;
  if (paging.page === 1) {
    dt = penarikan.data.slice(0, paging.limit);
  } else {
    dt = penarikan.data.slice(
      (paging.page - 1) * paging.limit,
      paging.page * paging.limit
    );
  }
  if (paging.page > 1 && !dt.length) {
    return penarikan.getData({ ...payload, mode: "next" });
  }
  return dt;
});

const payload = reactive({
  merchant_id: props.id,
  metode_id: "",
  start_at: "",
  end_at: "",
  limit: 300,
  last_id: 0,
  status: "",
});

penarikan.getData(payload);
metode.getData();
</script>
