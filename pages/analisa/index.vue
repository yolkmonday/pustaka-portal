<template>
  <div class="grid grid-cols-1">
    <div class="flex justify-end mb-2 mt-4">
      <button
        class="text-sm text-orange-500"
        @click.prevent="dataVendor = [], dataChannel = [], getKliringAll(), getChannel(),getVendor()"
      ><i class="fas fa-redo"></i> Reload</button>
    </div>
    <div class="flex gap-2 mb-4">
      <div class="bg-orange-100 p-4 rounded-md w-1/3">
        <p class="text-sm"><i class="fas fa-wallet"></i> Total Saldo Kliring</p>
        <p class="text-lg font-bold text-primary">{{ useRupiah(kliringAll) }}</p>
      </div>
      <div class="bg-white p-2 rounded-md border w-2/3">
        <h1 class="text-sm mb-2 text-primary"><i class="fas fa-wallet"></i> Total Kliring Channel</h1>
        <div class="flex gap-2 overflow-scroll">
          <div
            v-for="(c, i) in dataChannel"
            :key="i"
            class="flex-shrink-0 rounded-md py-2 px-4 border rounded-md"
          >
            <p class="text-xs">{{ c.name.toUpperCase() }}</p>
            <p class="text-xs">{{ useRupiah(c.total) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-md p-4">
      <h1 class="mb-2 text-primary text-sm"><i class="fas fa-wallet"></i> Total Saldo Dan Kliring Vendor</h1>
      <div class="grid grid-cols-4 gap-2">
        <div
          v-for="(v, i) in dataVendor"
          :key="i"
          class="border rounded-md p-3"
        >
          <div class="border-b pb-1 mb-1">
            <p class="text-lg font-bold mb-2">{{ v.name }}</p>
            <div class="flex justify-between">
              <div class="text-xs">
                <p><i class="fas fa-wallet text-gray-500"></i> Balance</p>
                <p
                  v-if="!v.errorSaldo && v.dataSaldo !== ''"
                  class="text-blue-500 font-bold"
                >{{ useRupiah(v.dataSaldo.balance) }}</p>
              </div>
              <div class="text-xs">
                <p><i class="fas fa-hand-holding-usd text-gray-500"></i> Hold</p>
                <p
                  v-if="!v.errorSaldo && v.dataSaldo !== ''"
                  class="text-orange-500 font-bold"
                >{{ useRupiah(v.dataSaldo.hold) }}</p>
              </div>
            </div>
            <div class="mt-2">
              <p
                v-if="v.errorSaldo"
                class="text-xs text-red-500"
              >Error: {{ v.errorSaldo }}</p>
            </div>
          </div>

          <div>
            <p class="text-xs">Total Kliring</p>
            <p class="font-bold">{{ useRupiah(v.total) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useKliring } from "@/store/kliring";
import { useVendor } from "@/store/vendor";
import { usePaymentChanel } from "@/store/payment-chanel";
definePageMeta({
  middleware: "auth",
});

const kliring = useKliring();
const vendor = useVendor();
const channel = usePaymentChanel();
const dataVendor = ref([]);
const dataChannel = ref([]);
const kliringAll = ref(0);
const payload = reactive({
  merchant_id: "",
  kode_channel: "",
  vendor_id: "",
  status: "Hold",
});

const getChannel = async () => {
  await channel.getData();
  if (channel.data) {
    for (let i = 0; i < channel.data.length; i++) {
      const element = channel.data[i];
      setTimeout(() => {
        getKliringByChannel(element);
      }, 800 * i);
    }
  }
};

const getKliringByChannel = async (data) => {
  const payloadChannel = {
    merchant_id: "",
    kode_channel: data.kode,
    vendor_id: "",
    status: "hold",
  };
  await kliring.getDetail(payloadChannel);
  dataChannel.value.push({ ...data, total: kliring.dataDetail });
};

const getVendor = async () => {
  await vendor.getData();
  if (vendor.data) {
    for (let i = 0; i < vendor.data.length; i++) {
      const element = vendor.data[i];
      setTimeout(() => {
        getKliringByVendor(element, i);
      }, 800 * i);
    }
  }
};

const getKliringByVendor = async (data, i) => {
  const payloadDetail = {
    merchant_id: "",
    kode_channel: "",
    vendor_id: data.id,
    status: "hold",
  };

  await kliring.getDetail(payloadDetail);
  dataVendor.value.push({
    ...data,
    total: kliring.dataDetail,
    dataSaldo: "",
    errorSaldo: "",
  });
  setTimeout(() => {
    getBalanceVendor(data, i);
  }, 500 * i);
};

const getBalanceVendor = async (data, i) => {
  await vendor.getSaldoVendor({ vendor: data.kode });
  dataVendor.value[i] = {
    ...dataVendor.value[i],
    dataSaldo: vendor.dataSaldo,
    errorSaldo: vendor.errorSaldo,
  };
};

const getKliringAll = async () => {
  await kliring.getDetail(payload);
  if (kliring.dataDetail) {
    kliringAll.value = kliring.dataDetail;
  }
};

getKliringAll();
getChannel();
getVendor();
</script>
