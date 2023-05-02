<template>
  <div>
    <div class="flex gap-x-2">
      <div
        v-if="kliringChannel"
        class="border rounded-md px-4 py-2 w-max mb-2 text-center"
      >
        <p class="text-xs">Total Kliring {{ payload.kode_channel }}</p>
        <p class="text-primary text-sm font-bold">{{ useRupiah(kliringChannel) }}</p>
      </div>
      <div
        v-if="kliringVendor"
        class="border rounded-md px-4 py-2 w-max mb-2 text-center"
      >
        <p class="text-xs">Total Kliring {{ selectedVendor }}</p>
        <p class="text-primary text-sm font-bold">{{ useRupiah(kliringVendor) }}</p>
      </div>
    </div>
    <div class="grid-4">
      <ClientOnly>
        <VueDatePicker
          v-model="date"
          range
          multi-calendars
          :disabled-dates="notBeforeToday"
          placeholder="Tanggal"
          :enable-time-picker="false"
          :month-change-on-scroll="false"
        ></VueDatePicker>
      </ClientOnly>
      <input
        v-model="payload.order_id"
        class="form-input"
        placeholder="Order ID"
      >
      <input
        v-model="payload.nominal"
        class="form-input"
        placeholder="Nominal"
      >
      <select
        v-model="payload.status"
        class="form-input"
      >
        <option
          value=""
          selected
        >Status</option>
        <option value="Release">Release</option>
        <option value="Hold">Hold</option>
      </select>
      <select
        v-model="payload.vendor_id"
        class="form-input"
      >
        <option
          value=""
          selected
        >Vendor</option>
        <option
          v-for="(v, i) in vendor.data || []"
          :value="v.id"
          :key="i"
        >
          {{ v.name }}
        </option>
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
          v-for="(c, i) in chanel.data || []"
          :value="c.kode"
          :key="i"
        >
          {{ c.name }}
        </option>
      </select>
      <div class="flex gap-2">
        <button
          class="btn-primary w-full"
          @click.prevent="page = 1, kliring.getData({ ...payload, mode: 'filter' })"
        ><i class="fas fa-search"></i> Cari</button>
        <button
          class="btn-secondary w-full"
          @click.prevent="page =1, payload.nominal = '', payload.vendor_id = '', payload.kode_channel = '', payload.status = '', payload.order_id = '', date = '', payload.start_at = '', payload.end_at = '', kliring.getData({ ...payload, mode: '' })"
        ><i class="fas fa-redo"></i> Reset</button>
      </div>
    </div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-200">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">
              <p>Order ID</p>
            </td>
            <td class="py-4 px-4">Nominal</td>
            <td class="py-4 px-4">Kode Channel</td>
            <td class="py-4 px-4">
              <p>Status</p>
            </td>
            <td class="py-4 px-4">
              <p>Tgl dibuat</p>
            </td>
            <td class="py-4 px-4">
              <p>Tgl Release</p>
            </td>
            <td class="py-4 px-4">
              <p>Tgl Libur</p>
            </td>
            <td class="py-4 px-4">Tgl Plus</td>
          </tr>
        </thead>
        <tbody v-if="kliring.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>

        <tbody v-if="!kliring.loading && kliring.data">
          <tr
            v-for="(m, i) in data || []"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{m.id}}</td>
            <td class="p-4">{{ m.order_id }}</td>
            <td class="p-4">{{ useRupiah(m.nominal) }}</td>
            <td class="p-4">{{ m.kode_channel }}</td>
            <td class="p-4">
              <p
                :class="m.status === 'Release' ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'"
                class="rounded-full w-max px-3 py-1"
              >{{ m.status }}</p>
            </td>
            <td class="p-4">{{ useMomentDate(m.created_at) }}</td>
            <td class="p-4">{{ useMomentDate(m.date_release) }}</td>
            <td class="p-4">
              <div
                v-for="(t, j) in m.tgl_libur"
                :key="j"
              >
                <p>{{ t }}</p>
              </div>
            </td>
            <td class="p-4">
              <div
                v-for="(t, j) in m.tgl_plus"
                :key="j"
              >
                <p>{{ t }}</p>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!data.length && !kliring.loading">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p>Data Not Found</p>
              <p class="text-xs">{{ kliring.error }}</p>
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
import VueDatePicker from "@vuepic/vue-datepicker";
import { useKliring } from "@/store/kliring";
import { useMoment } from "@/composables/useMoment";
import { useVendor } from "@/store/vendor";
import { usePaymentChanel } from "@/store/payment-chanel";
const props = defineProps({
  id: { type: [String] },
});

const kliring = useKliring();
const vendor = useVendor();
const chanel = usePaymentChanel();
const kliringChannel = ref(0);
const kliringVendor = ref(0);
const selectedVendor = ref("");
const paging = reactive({
  page: 1,
  limit: 30,
});
const payload = reactive({
  merchant_id: props.id,
  order_id: "",
  nominal: "",
  start_at: "",
  end_at: "",
  status: "",
  limit: 300,
  last_id: 0,
  vendor_id: "",
  kode_channel: "",
});

const date = ref("");

watch(date, (a, b) => {
  if (a !== null) {
    payload.start_at = useMoment(a[0]).format("YYYY-MM-DD");
    payload.end_at = useMoment(a[1]).format("YYYY-MM-DD");
  } else {
    payload.start_at = "";
    payload.end_at = "";
  }
});

const data = computed(() => {
  let dt;
  if (paging.page === 1) {
    dt = kliring.data.slice(0, paging.limit);
  } else {
    dt = kliring.data.slice(
      (paging.page - 1) * paging.limit,
      paging.page * paging.limit
    );
  }
  if (paging.page > 1 && !dt.length) {
    return kliring.getData({ ...payload, mode: "next" });
  }
  for (let i = 0; i < dt.length; i++) {
    const element = dt[i];
    element.tgl_libur = element.tgl_libur ? element.tgl_libur.split(",") : [];
    element.tgl_plus = element.tgl_plus ? element.tgl_plus.split(",") : [];
  }

  return dt;
});

watch(payload, (a, b) => {
  if (a.kode_channel !== "") {
    getKliringChannel(a.kode_channel);
  } else {
    kliringChannel.value = 0;
  }

  if (a.vendor_id !== "") {
    for (let i = 0; i < vendor.data.length; i++) {
      const element = vendor.data[i];
      if (element.id === a.vendor_id) {
        selectedVendor.value = element.name;
      }
    }
    getKliringVendor(a.vendor_id);
  } else {
    kliringVendor.value = 0;
  }
});

const notBeforeToday = (date) => {
  return date > new Date(new Date().setHours(0, 0, 0, 0));
};

const getKliringVendor = async (id) => {
  kliringVendor.value = 0;
  await kliring.getDetail({
    merchant_id: props.id,
    kode_channel: "",
    vendor_id: id,
    status: "Hold",
  });
  kliringVendor.value = kliring.dataDetail;
};

const getKliringChannel = async (kode) => {
  kliringVendor.value = 0;
  await kliring.getDetail({
    merchant_id: props.id,
    kode_channel: kode,
    vendor_id: "",
    status: "Hold",
  });
  kliringChannel.value = kliring.dataDetail;
};

kliring.getData(payload);
vendor.getData();
chanel.getData();
</script>
