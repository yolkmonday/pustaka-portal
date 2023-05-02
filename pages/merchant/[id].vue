<template>
  <div>
    <error-span
      v-if="data.error"
      :message="data.error"
    />
    <div class="bg-white rounded-md p-4">
      <div class="mb-6 flex">
        <p
          class="font-bold hover:text-primary w-max cursor-pointer"
          @click.prevent="$router.go(-1)"
        >
          <i class="fas fa-angle-left"></i> Detail Merchant #{{
            route.params._id
          }}
        </p>
      </div>
      <div v-if="data.loading">
        <loader />
      </div>
      <div v-if="!data.loading && data.detail.id">
        <div class="grid grid-cols-3 gap-3">
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500"><i class="fas fa-tag"></i> ID</p>
            <p>#{{ data.detail.id }}</p>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-user-tag"></i> Merchant ID
            </p>
            <p>{{ data.detail.merchant_id }}</p>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-store"></i> Nama Toko
            </p>
            <p>{{ data.detail.nama_toko }}</p>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-wallet"></i> Saldo
            </p>
            <p class="text-green-500">{{ useRupiah(data.detail.saldo) }}</p>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-wallet"></i> Saldo Kliring
            </p>
            <div class="flex items-center gap-x-2">
              <p class="text-orange-500">{{ useRupiah(data.detail.saldo_kliring) }}</p>
              <p class="w-max px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-500">Total Saldo: {{ useRupiah(data.detail.saldo + data.detail.saldo_kliring) }}</p>
            </div>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500"><i class="fas fa-at"></i> Email</p>
            <p>{{ data.detail.email }}</p>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-phone-square-alt"></i> Handphone
            </p>
            <p>{{ data.detail.no_hp }}</p>
          </div>

          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-user-check"></i> Verifikasi
            </p>
            <div class="flex items-center gap-x-1">
              <p
                :class="
                  data.detail.is_email
                    ? 'bg-green-100 text-green-500'
                    : 'bg-red-100 text-red-500'
                "
                class="w-max px-3 text-xs rounded-full"
              >
                <i
                  :class="
                    data.detail.is_email ? 'fas fa-check' : 'fas fa-times'
                  "
                  class="text-xs"
                ></i>
                Email
              </p>
              <p
                :class="
                  data.detail.is_hp
                    ? 'bg-green-100 text-green-500'
                    : 'bg-red-100 text-red-500'
                "
                class="w-max px-3 text-xs rounded-full"
              >
                <i
                  :class="data.detail.is_hp ? 'fas fa-check' : 'fas fa-times'"
                  class="text-xs"
                ></i>
                Hp
              </p>
              <p
                :class="
                  data.detail.is_verif
                    ? 'bg-green-100 text-green-500'
                    : 'bg-red-100 text-red-500'
                "
                class="w-max px-3 text-xs rounded-full"
              >
                <i
                  :class="
                    data.detail.is_verif ? 'fas fa-check' : 'fas fa-times'
                  "
                  class="text-xs"
                ></i>
                Verifikasi
              </p>
            </div>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500"><i class="fas fa-lock"></i> 2FA</p>
            <p
              :class="
                data.detail.is_fa
                  ? 'bg-green-100 text-green-500'
                  : 'bg-red-100 text-red-500'
              "
              class="rounded-full px-3 w-max text-xs"
            >
              {{ data.detail.is_fa ? "Aktif" : "Tidak Aktif" }}
            </p>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-clock"></i> Tgl Daftar
            </p>
            <p>{{ useMomentDate(data.detail.created_at) }}</p>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-clock"></i> Tgl Updated
            </p>
            <p>{{ useMomentDate(data.detail.updated_at) }}</p>
          </div>
          <div class="border-b pb-1">
            <p class="text-xs text-gray-500">
              <i class="fas fa-list"></i> Whitelist IP
            </p>
            <p class="text-sm">{{ data.detail.whitelist_ip }}</p>
          </div>
          <div class="border-b pb-1 w-max">
            <p class="text-xs text-gray-500">
              <i class="fas fa-list"></i> Webhook
            </p>
            <p class="text-sm">{{ data.detail.webhook }}</p>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button
            class="bg-orange-500 text-white px-3 py-1 rounded-md"
            @click.prevent="show = true"
          ><i class="fa fa-share-square"></i> Tarik Saldo</button>
        </div>
      </div>
    </div>

    <!-- TAB MERCHANT -->
    <div class="bg-white rounded-md p-4 mt-4">
      <div class="grid grid-cols-8 gap-4 text-sm mb-6">
        <div
          :class="
            tab === 'transaksi'
              ? 'border-b text-primary border-primary font-bold'
              : 'text-black'
          "
          class="text-center cursor-pointer transition delay-150 duration-300 ease-in-out"
          @click.prevent="tab = 'transaksi'"
        >
          <p>Transaksi</p>
        </div>
        <div
          :class="
            tab === 'penarikan'
              ? 'border-b text-primary border-primary font-bold'
              : 'text-black'
          "
          class="text-center cursor-pointer transition delay-150 duration-300 ease-in-out"
          @click.prevent="tab = 'penarikan'"
        >
          Penarikan
        </div>
        <div
          :class="
            tab === 'kliring'
              ? 'border-b text-primary border-primary font-bold'
              : 'text-black'
          "
          class="text-center cursor-pointer transition delay-150 duration-300 ease-in-out"
          @click.prevent="tab = 'kliring'"
        >
          Kliring
        </div>
        <div
          :class="
            tab === 'rekening'
              ? 'border-b text-primary border-primary font-bold'
              : 'text-black'
          "
          class="text-center cursor-pointer transition delay-150 duration-300 ease-in-out"
          @click.prevent="tab = 'rekening'"
        >
          Rekening
        </div>
      </div>
      <div>
        <transaksi-merchant
          v-if="tab === 'transaksi' && data.detail.merchant_id"
          :id="data.detail.merchant_id"
        />
      </div>
      <div>
        <penarikan-saldo-merchant
          v-if="tab === 'penarikan' && data.detail.merchant_id"
          :id="data.detail.merchant_id"
        />
      </div>
      <div>
        <kliring-merchant
          v-if="tab === 'kliring' && data.detail.merchant_id"
          :id="data.detail.merchant_id"
        />
      </div>
      <div>
        <rekening-merchant
          v-if="tab === 'rekening' && data.detail.merchant_id"
          :id="data.detail.merchant_id"
        />

      </div>
    </div>
    <!-- END TAB -->

    <!-- MODAL TARIK SALDO -->
    <VueFinalModal
      v-model="show"
      class="flex justify-center items-center"
      content-class="bg-white rounded p-4 w-82"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      :clickToClose="false"
    >
      <h1 class="text-center font-bold mb-4">Tarik Saldo</h1>
      <h1 class="text-center mb-2">Apakah kamu yakin ingin menarik semua saldo dari merchant ini?</h1>
      <div class="flex justify-end gap-4 mt-10">
        <button
          class="btn-primary"
          :disabled="saldo.loadingAction"
          @click.prevent="actionTarikSaldo()"
        >
          <i
            v-if="saldo.loadingAction"
            class="fas fa-spinner animate animate-spin"
          ></i>
          <i
            v-else
            class="fa fa-share-square"
          ></i> Tarik</button>
        <button @click.prevent="show = false"><i class="fas fa-times"></i> Tutup</button>
      </div>
    </VueFinalModal>
    <!-- END MODAL -->

  </div>
</template>
<script setup>
import { VueFinalModal } from "vue-final-modal";
import { useMerchant } from "@/store/merchant";
import { usePenarikanSaldo } from "@/store/penarikan-saldo";
definePageMeta({
  middleware: "auth",
});

const data = useMerchant();
const saldo = usePenarikanSaldo();
const route = useRoute();
const { $toast } = useNuxtApp();
const tab = ref("transaksi");
const show = ref(false);

data.getDetail(route.params.id);

const actionTarikSaldo = async () => {
  await saldo.tarikSaldo(route.params.id);
  if (saldo.messageAction) {
    $toast.success(saldo.messageAction);
    show.value = false;
    data.getDetail(route.params.id);
  }
  if (saldo.errorAction) {
    $toast.error(saldo.errorAction);
  }
};
</script>
