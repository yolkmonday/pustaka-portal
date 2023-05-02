<template>
  <div>
    <error-span
      v-if="data.error"
      :message="data.error"
    />
    <div class="bg-white rounded-md p-4 mb-3">
      <div class=" mb-6 flex">
        <p
          class="font-bold hover:text-primary w-max cursor-pointer"
          @click.prevent="$router.go(-1)"
        ><i class="fas fa-angle-left"></i> Detail Transaksi #{{ route.params.id }}</p>
      </div>
      <div class="flex justify-end mb-2">
        <button
          class="text-primary text-sm"
          @click.prevent="tab = 'trx', reloadLogTrx = reloadLogTrx ? false : true,  detailTransaksi()"
        ><i class="fas fa-redo"></i> Reload</button>
      </div>
      <div v-if="data.loading">
        <loader />
      </div>

      <div
        v-if="!data.loading && data.detail.data"
        class="grid grid-cols-2 gap-2 text-sm"
      >
        <div class="border rounded">
          <div class="bg-gray-100 p-3">
            <h1 class="font-bold text-center">Data Transaksi</h1>
          </div>
          <div class="p-4">
            <div class="grid grid-cols-2 gap-2 mb-3 border-b pb-1">
              <div>
                <p class="text-xs text-gray-500">ID</p>
                <p>{{ data.detail.data.id }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">TRX ID</p>
                <p>{{ data.detail.data.trx_id }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-3 border-b pb-1">
              <div>
                <p class="text-xs text-gray-500">REF ID</p>
                <p>{{ data.detail.data.reff_id }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Merchant Id</p>
                <NuxtLink
                  :to="`/merchant/${data.detail.data.merchant_id}`"
                  class="text-primary"
                >{{ data.detail.data.merchant_id }}</NuxtLink>
              </div>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Chanel</p>
              <p>{{ data.detail.data.kode_channel }} <span class="text-xs text-gray-500">{{ data.detail.data.nama_chanel }}</span></p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Kategori</p>
              <p>{{ data.detail.data.kategori_name }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-3 border-b pb-1">
              <div>
                <p class="text-xs text-gray-500">Kode Vendor</p>
                <p>{{ data.detail.data.vendor_kode }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Nama Vendor</p>
                <p>{{ data.detail.data.vendor_name }}</p>
              </div>

            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Beban Merchant</p>
              <p>{{ data.detail.data.is_beban_merchant ? 'Merchant' : 'User' }}</p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Nominal</p>
              <p>{{ useRupiah(data.detail.data.nominal) }}</p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Biaya Admin</p>
              <p>{{ useRupiah(data.detail.data.biaya_admin) }}</p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Biaya Admin Vendor</p>
              <p>{{ useRupiah(data.detail.data.biaya_admin_vendor) }}</p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Jumlah Diterima</p>
              <p>{{ useRupiah(data.detail.data.jumlah_diterima) }}</p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Jumlah Bayar</p>
              <p>{{ useRupiah(data.detail.data.jumlah_bayar) }}</p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Profit</p>
              <p>{{ useRupiah(data.detail.data.profit) }}</p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Status</p>
              <p
                :class="data.detail.data.status ==='Failed' ? 'bg-red-100 text-red-500' : data.detail.data.status === 'Success' ? 'bg-green-100 text-green-500' : 'bg-orange-100 text-orange-500'"
                class="rounded-full px-3 w-max py-1"
              >{{ data.detail.data.status }}</p>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Expired</p>
              <p>{{ useMomentDate(data.detail.data.expired_at) || '-' }}</p>
              <span
                v-if="useMoment().unix() < useMoment(data.detail.data.expired_at).unix()"
                class="text-primary text-xs"
              >Expired {{ useMoment(data.detail.data.expired_at).fromNow() }}</span>
              <span
                v-else
                class="text-red-500 text-xs"
              >Expired</span>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-3 border-b pb-1">
              <div>
                <p class="text-xs text-gray-500">Tgl Dibuat</p>
                <p>{{ useMomentUnix(data.detail.data.created_at_unix) }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Tgl Diedit</p>
                <p>{{ useMomentUnix(data.detail.data.updated_at_unix) }}</p>
              </div>
            </div>
            <div class="border-b pb-1 mb-3">
              <p class="text-xs text-gray-500">Redirect URL</p>
              <p>{{ data.detail.data.redirect_url || '-' }}</p>
            </div>
            <div class="grid grid-cols-2 gap-2 mb-3 border-b pb-1">
              <div>
                <p class="text-xs text-gray-500">Customer Email</p>
                <p>{{ data.detail.data.cs_email }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500">Customer Phone</p>
                <p>{{ data.detail.data.cs_phone }}</p>
              </div>
            </div>
            <div class="mt-4 flex justify-end gap-2">
              <button
                class="bg-orange-500 text-sm rounded-md text-white px-4 py-1"
                @click.prevent="showWebhook = true"
              ><i class="fas fa-paper-plane"></i> Kirim Webhook</button>
              <button
                v-if="data.detail.data.status !== 'Failed'"
                class="btn-primary"
                @click.prevent="showAction = true"
              > Action Transaksi</button>
            </div>
          </div>
        </div>
        <div class="border rounded">
          <div class="bg-gray-100 p-3">
            <h1 class="font-bold text-center">Data Produk</h1>
          </div>
          <div class="p-4 h-[1000px] overflow-scroll">
            <div
              v-for="(p, i) in data.detail.detail"
              :key="i"
              class="mb-2 text-sm"
            >
              <div class="border rounded-md p-4">
                <div class="grid grid-cols-2 gap-2 mb-2 border-b pb-1">
                  <div>
                    <p class="text-gray-500 text-xs">ID</p>
                    <p>{{ p.id }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500 text-xs">TRX ID</p>
                    <p>{{ p.trx_id }}</p>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2 mb-2 border-b pb-1">
                  <div>
                    <p class="text-gray-500 text-xs">Kode Produk</p>
                    <p>{{ p.product_code }}</p>
                  </div>
                  <div>
                    <p class="text-gray-500 text-xs">Nama</p>
                    <p>{{ p.name }}</p>
                  </div>
                </div>
                <div class="mb-2 border-b pb-1">
                  <p class="text-gray-500 text-xs">Harga</p>
                  <p>{{ useRupiah(p.price) }}</p>
                </div>
                <div class="mb-2 border-b pb-1">
                  <p class="text-gray-500 text-xs">Produk URL</p>
                  <p>{{ p.product_url || '-' }}</p>
                </div>
                <div class="mb-2 border-b pb-1">
                  <p class="text-gray-500 text-xs">Image URL</p>
                  <p>{{ p.image_url || '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CONTAINER TRANSAKSI VENDOR DAN DATA KLIRING -->
    <div class="bg-white p-4 mb-4 rounded-md grid grid-cols-2 gap-2">
      <div class="border p-4 rounded h-max">
        <h1 class="text-center mb-3 font-bold">Status Transaksi Vendor</h1>
        <div v-if="data.loadingVendor">
          <loader />
        </div>
        <div v-if="data.errorTrxVendor">
          <div class="text-sm border-b pb-1 mb-2">
            <p class="text-sm text-gray-500">Status</p>
            <p>{{ data.errorTrxVendor }}</p>
          </div>
        </div>
        <div
          v-if="!data.loadingVendor && data.dataTrxVendor.status"
          class="text-sm"
        >
          <div class="border-b mb-2 pb-1">
            <p class="text-sm text-gray-500">Status</p>
            <p>{{ responseVendor.status }}</p>
          </div>
          <div class="border-b mb-2 pb-1">
            <p class="text-sm text-gray-500">Msg</p>
            <p>{{ responseVendor.msg }}</p>
          </div>
          <div class="border-b mb-2 pb-1">
            <p class="text-sm text-gray-500">Respon Real</p>
            <div>
              <Json :data="responseVendor.respon_real" />
            </div>
          </div>
        </div>
      </div>
      <div class="border p-4 rounded h-max">
        <h1 class="text-center mb-3 font-bold">Data Kliring</h1>
        <div v-if="kliring.loading">
          <loader />
        </div>
        <div v-if="kliring.error">
          <p class="text-sm text-center">{{ kliring.error }}</p>
        </div>
        <div
          v-if="!kliring.loading && kliring.data.length"
          class="text-sm"
        >
          <div
            v-for="(k, i) in dataKliring"
            :key="i"
            class="bg-gray-100 mb-2 p-2"
          >
            <div class="border-b mb-3">
              <p class="text-sm text-gray-500">ID</p>
              <p>{{ k.id }}</p>
            </div>
            <div class="border-b mb-3">
              <p class="text-sm text-gray-500">Order Id</p>
              <p>{{ k.order_id }}</p>
            </div>
            <div class="border-b mb-3">
              <p class="text-sm text-gray-500">Nominal</p>
              <p>{{ useRupiah(k.nominal) }}</p>
            </div>
            <div class="border-b mb-3">
              <p class="text-sm text-gray-500">Tgl Dibuat</p>
              <p>{{ useMomentDate(k.created_at) }}</p>
            </div>
            <div class="border-b mb-3">
              <p class="text-sm text-gray-500">Tgl Release</p>
              <p>{{ useMomentDate(k.date_release) }}</p>
            </div>
            <div class="border-b mb-3">
              <p class="text-sm text-gray-500">Status</p>
              <p :class="k.status === 'Release' ? 'text-green-500' : 'text-red-500'">{{ k.status }}</p>
            </div>
            <div class=" grid grid-cols-2 gap-2 border-b pb-1 mb-2">
              <div>
                <p class="text-sm text-gray-500">Tgl Libur</p>
                <div
                  v-for="(l, j) in k.tgl_libur"
                  :key="j"
                >
                  <p>{{ l }}</p>
                </div>
              </div>
              <div>
                <p class="text-sm text-gray-500">Tgl Plus</p>
                <div
                  v-for="(l, j) in k.tgl_plus"
                  :key="j"
                >
                  <p>{{ l }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END CONTAINER TRANSAKSI VENDOR DAN DATA KLIRING -->

    <!-- TAB LOG -->
    <div class="bg-white rounded-md">
      <div class="grid grid-cols-8 gap-4 text-sm mb-4 p-4">
        <div
          :class="tab === 'trx' ? 'border-b text-primary border-primary font-bold': 'text-black'"
          class="text-center cursor-pointer transition delay-150 duration-300 ease-in-out"
          @click.prevent="tab = 'trx'"
        >
          <p>Log Transaksi</p>
        </div>
        <div
          :class="tab === 'vendor' ? 'border-b text-primary border-primary font-bold': 'text-black'"
          class="text-center cursor-pointer transition delay-150 duration-300 ease-in-out"
          @click.prevent="tab = 'vendor'"
        >
          Log Vendor
        </div>
        <div
          :class="tab === 'webhook' ? 'border-b text-primary border-primary font-bold': 'text-black'"
          class="text-center cursor-pointer transition delay-150 duration-300 ease-in-out"
          @click.prevent="tab = 'webhook'"
        >
          Log Webhook
        </div>
      </div>
      <log-trx
        v-if="tab === 'trx' && data.detail.data"
        :reff="data.detail.data.reff_id"
        :reloads="reloadLogTrx"
      />

      <log-vendor
        v-if="tab === 'vendor' && data.detail.data"
        :trx="data.detail.data.trx_id"
      />

      <log-webhook
        v-if="tab === 'webhook' && data.detail.data"
        :trx="data.detail.data.trx_id"
      />
    </div>
    <!-- END TAB LOG -->

    <!-- MODAL SEND WEBHOOK -->
    <VueFinalModal
      v-model="showWebhook"
      class="flex justify-center items-center"
      content-class="bg-white rounded p-4 w-1/2"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      :clickToClose="false"
    >
      <h1 class="text-center font-bold mb-4">Kirim Ulang Webhook</h1>
      <h1 class="text-center">Apakah kamu yakin ingin mengirim ulang Webhook pada transaksi ini?</h1>
      <div class="flex justify-end gap-4 mt-10">
        <button
          class="btn-primary"
          :disabled="data.loadingAction"
          @click.prevent="actionSendWebhook()"
        >
          <i
            v-if="data.loadingAction"
            class="fas fa-spinner animate animate-spin"
          ></i>
          <i
            v-else
            class="fa fa-paper-plane"
          ></i> Kirim</button>
        <button
          type="button"
          @click.prevent="showWebhook = false"
        ><i class="fas fa-times"></i> Tutup</button>
      </div>
    </VueFinalModal>
    <!-- END MODAL -->

    <!-- MODAL ACTION -->
    <VueFinalModal
      v-model="showAction"
      class="flex justify-center items-center"
      content-class="bg-white rounded p-4 w-1/3"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      :clickToClose="false"
    >
      <h1 class="text-center font-bold mb-4">Action Transaksi</h1>
      <form @submit.prevent="actionTransaksi()">
        <div>
          <p class="text-sm text-gray-500">Status</p>
          <select
            v-model="selectedAction"
            required
            class="form-input"
          >
            <option
              value=""
              selected
            >Pilih Status</option>
            <option value="Success">Sukses</option>
            <option value="Failed">Gagal</option>
          </select>
        </div>
        <div class="flex justify-end gap-4 mt-10">
          <button
            type="submit"
            class="btn-primary"
            :disabled="data.loadingAction"
          >
            <i
              v-if="data.loadingAction"
              class="fas fa-spinner animate animate-spin"
            ></i>
            <i
              v-else
              class="fa fa-check"
            ></i> Proses</button>
          <button
            type="button"
            @click.prevent="showAction = false"
          ><i class="fas fa-times"></i> Tutup</button>
        </div>
      </form>
    </VueFinalModal>
    <!-- END MODAL APPROVE -->

  </div>
</template>
<script setup>
import { VueFinalModal } from "vue-final-modal";
import { useTransaksi } from "../../store/transaksi";
import { useKliring } from "@/store/kliring";

definePageMeta({
  middleware: "auth",
});

const data = useTransaksi();
const kliring = useKliring();
const { $toast } = useNuxtApp();
const route = useRoute();
const tab = ref("trx");
const showWebhook = ref(false);
const showAction = ref(false);
const responseVendor = ref({});
const selectedAction = ref("");
const reloadLogTrx = ref(false);

const dataKliring = computed(() => {
  const dt = kliring.data;
  for (let i = 0; i < dt.length; i++) {
    const element = dt[i];
    element.tgl_libur = element.tgl_libur.split(",");
    element.tgl_plus = element.tgl_plus.split(",");
  }
  return dt;
});

const parse = (val) => {
  try {
    return JSON.parse(val);
  } catch (error) {
    return { data: "-" };
  }
};

const payloadKliring = reactive({
  merchant_id: "",
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

// ONMOUNTED
const detailTransaksi = async () => {
  await data.getDetail(route.params.id);
  if (data.detail.data) {
    trxVendor();
    listKliring();
  }
};

const listKliring = async () => {
  payloadKliring.merchant_id = data.detail.data.merchant_id;
  payloadKliring.order_id = data.detail.data.trx_id;
  await kliring.getData(payloadKliring);
};

const trxVendor = async () => {
  await data.getTrxVendor(data.detail.data.trx_id);
  responseVendor.value = data.dataTrxVendor;
  responseVendor.value.respon_real = parse(responseVendor.value.respon_real);
};

detailTransaksi();
// END ONMOUNTED

// FUNCTION METHODS
const actionSendWebhook = async () => {
  const payloadWebhook = {
    merchant_id: data.detail.data.merchant_id,
    trx_id: data.detail.data.trx_id,
  };
  await data.sendWebhook(payloadWebhook);
  if (data.messageAction) {
    $toast.success(data.messageAction);
    showWebhook.value = false;
    data.getDetail(route.params.id);
  } else {
    $toast.error(data.errorAction);
  }
};

const actionTransaksi = async () => {
  const payloadTrx = {
    trx_id: data.detail.data.trx_id,
    status: selectedAction.value,
  };

  await data.actionTransaksi(payloadTrx);
  if (data.messageAction) {
    $toast.success(data.messageAction);
    showAction.value = false;
    detailTransaksi();
  } else {
    $toast.error(data.errorAction);
  }
};
</script>
