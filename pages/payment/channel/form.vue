<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between">
      <p class="font-bold" @click.prevent="$router.go(-1)">
        <i class="fas fa-angle-left"></i> {{ id ? "Ubah" : "Tambah" }} Payment
        Channel
      </p>
    </div>
    <form @submit.prevent="paymentChanel.action(payload)">
      <div class="px-4" v-if="!paymentChanel.loadingDetail">
        <div class="grid grid-cols-3 gap-3 mb-3">
          <div>
            <label for="" class="text-label">Nama Channel</label>
            <input
              required
              class="form-input"
              type="text"
              v-model="payload.name"
            />
          </div>
          <div>
            <label for="" class="text-label">Kode Channel</label>
            <input
              required
              class="form-input"
              type="text"
              v-model="payload.kode"
            />
          </div>
          <div>
            <label for="" class="text-label">Tipe</label>
            <select
              required
              class="form-input"
              type="text"
              v-model="payload.tipe"
            >
              <option value="" selected disabled>Pilih Tipe</option>
              <option value="DIRECT">Direct</option>
              <option value="REDIRECT">Redirect</option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-3 mb-3">
          <div>
            <label for="" class="text-label">Logo</label>
            <input
              required
              class="form-input"
              type="text"
              v-model="payload.logo"
            />
          </div>
          <div>
            <label for="" class="text-label">Kategori</label>
            <select
              required
              class="form-input"
              type="text"
              v-model="payload.kategori_id"
            >
              <option value="" selected disabled>Pilih Kategori</option>
              <option v-for="(k, i) in kategori.data" :key="i" :value="k.id">
                {{ k.name }}
              </option>
            </select>
          </div>
          <div>
            <label for="" class="text-label">Vendor</label>

            <select
              required
              class="form-input"
              type="text"
              v-model="payload.vendor"
            >
              <option value="" selected disabled>Pilih Vendor</option>
              <option v-for="(v, i) in vendor.data" :key="i" :value="v.kode">
                {{ v.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-3 mb-3">
          <div>
            <label for="" class="text-label">Kode Vendor</label>
            <input
              required
              class="form-input"
              type="text"
              v-model="payload.vendor_kode"
            />
          </div>
          <div>
            <label for="" class="text-label">Status</label>
            <select
              required
              class="form-input"
              type="text"
              v-model="payload.status"
            >
              <option value="" selected disabled>Pilih Status</option>
              <option value="1">Aktif</option>
              <option value="0">Tidak Aktif</option>
            </select>
          </div>
          <div>
            <label for="" class="text-label">Kliring </label>
            <input
              required
              class="form-input"
              type="number"
              v-model="payload.kliring"
            />
            <span class="text-[10px] text-gray-500"
              >Jumlah Hari Saldo Terpendam</span
            >
          </div>
          <div>
            <label for="" class="text-label">Proses di Weekend</label>
            <select
              required
              class="form-input"
              type="text"
              v-model="payload.is_weekend"
            >
              <option value="" selected disabled>Pilih Status</option>
              <option value="1">Ya</option>
              <option value="0">Tidak</option>
            </select>
          </div>
        </div>

        <div class="col-span-4 mb-3 grid grid-cols-4 gap-3">
          <div>
            <label for="" class="text-label">Biaya Admin User (Flat)</label>
            <input
              required
              class="form-input"
              type="number"
              v-model="payload.admin_flat_user"
            />
          </div>
          <div>
            <label for="" class="text-label">Biaya Admin User (Persen)</label>
            <input
              required
              class="form-input"
              type="text"
              v-model="payload.admin_persen_user"
            />
          </div>
          <div>
            <label for="" class="text-label"> Biaya Admin Vendor (Flat)</label>
            <input
              required
              class="form-input"
              type="number"
              v-model="payload.admin_flat_vendor"
            />
          </div>
          <div>
            <label for="" class="text-label">Biaya Admin Vendor (Persen)</label>
            <input
              required
              class="form-input"
              type="text"
              v-model="payload.admin_persen_vendor"
            />
          </div>
        </div>
        <div class="grid grid-cols-1">
          <label for="" class="text-label block">Cara Bayar</label>
          <client-only>
            <text-editor
              v-model="payload.panduan_bayar"
              :data="payload.panduan_bayar"
              @content="
                (v) => {
                  payload.panduan_bayar = v;
                }
              "
            />
          </client-only>
        </div>
        <button class="btn-primary w-48 mt-4" type="submit">
          <i
            class="fas fa-spinner animate animate-spin"
            v-if="paymentChanel.loadingAction"
          ></i>
          <i v-else class="fas fa-save"></i> Simpan
        </button>
      </div>
      <div
        class="px-4 animate animate-pulse text-center w-full"
        v-if="paymentChanel.loadingDetail"
      >
        <loader />
      </div>
    </form>
  </div>
</template>

<script setup>
import { usePaymentChanel } from "@/store/payment-chanel";
import { useKategori } from "@/store/kategori";
import { useVendor } from "@/store/vendor";
import { reactive } from "vue";

definePageMeta({
  middleware: "auth",
});
const paymentChanel = usePaymentChanel();
const vendor = useVendor();
const kategori = useKategori();

const route = useRoute();
const id = route?.query?.id;

const payload = reactive({
  id: 0,
  name: "",
  tipe: "",
  logo: "",
  admin_flat_user: "",
  admin_persen_user: "",
  admin_flat_vendor: "",
  admin_persen_vendor: "",
  kode: "",
  vendor_kode: "",
  vendor: "",
  kategori_id: 1,
  produk_config: "{}",
  produk_config_form: "{}",
  status: 1,
  kliring: 0,
  is_weekend: 0,
  panduan_bayar: "",
});

if (id) {
  payload.id = id;
  paymentChanel.getDetail(id);
  if (paymentChanel.dataDetail) {
    setTimeout(() => {
      const d = paymentChanel.dataDetail;
      payload.id = d.id || "";
      payload.name = d.name || "";
      payload.tipe = d.tipe || "";
      payload.logo = d.logo || "";
      payload.admin_flat_user = d.admin_flat_user || "";
      payload.admin_persen_user = d.admin_persen_user || "";
      payload.admin_flat_vendor = d.admin_flat_vendor || "";
      payload.admin_persen_vendor = d.admin_persen_vendor || "";
      payload.kode = d.kode || "";
      payload.vendor_kode = d.vendor_kode || "";
      payload.vendor = d.vendor || "";
      payload.kategori_id = d.kategori_id || "";
      payload.produk_config = d.produk_config || "";
      payload.produk_config_form = d.produk_config_form || "";
      payload.status = d.status || "";
      payload.kliring = d.kliring || "";
      payload.is_weekend = d.is_weekend || "";
      payload.panduan_bayar = d.panduan_bayar || "";
    }, 1000);
  }
}
vendor.getData();
kategori.getData();
</script>
