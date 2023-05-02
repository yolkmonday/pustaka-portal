<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between">
      <p class="font-bold">List Metode Penarikan</p>
    </div>
    <div class="flex justify-end px-4">
      <button
        class="btn-primary"
        @click.prevent="dataAdd.nama = '', dataAdd.logo = '', dataAdd.biaya_admin = '', dataAdd.status = 1, dataAdd.id = '', mode = 'Tambah', show  = true"
      ><i class="fas fa-plus"></i> Tambah Metode Penarikan</button>
    </div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-300">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">Nama</td>
            <td class="py-4 px-4">Biaya Admin</td>
            <td class="py-4 px-4">Status</td>
            <td></td>
          </tr>
        </thead>
        <tbody v-if="metode.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>
        <tbody v-if="!metode.loading && !metode.data.length">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p>{{ metode.error }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!metode.loading && metode.data.length">
          <tr
            v-for="(m, i) in metode.data"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{ m.id }}</td>
            <td class="p-4">
              <div class="flex items-center gap-x-2">
                <img
                  :src="m.logo"
                  class="w-10"
                  alt=""
                >
                <p>
                  {{ m.nama }}
                </p>
              </div>
            </td>
            <td class="p-4">
              <p>
                {{ useRupiah(m.biaya_admin) }}

              </p>
            </td>
            <td class="p-4">
              <p
                :class="m.status ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'"
                class="w-max rounded-full px-3 py-1"
              >{{ m.status ? 'Aktif' : 'Nonaktif' }}</p>
            </td>
            <td class="p-4">
              <button
                class="focus:outline-none text-orange-500"
                @click.prevent="dataAdd = {...m}, mode = 'Edit' , show = true"
              ><i class="fas fa-edit"></i> Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <VueFinalModal
      v-model="show"
      class="flex justify-center items-center"
      content-class="bg-white rounded p-4 w-1/2"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      :clickToClose="false"
    >
      <h1 class="text-center font-bold mb-4">{{ mode }} Metode Penarikan</h1>
      <form @submit.prevent="actionMetode()">
        <div class="mb-2">
          <p class="text-sm text-gray-500">Nama Metode</p>
          <input
            v-model="dataAdd.nama"
            required
            class="form-input"
            placeholder="Masukkan Nama Metode"
          >
        </div>
        <div class="mb-2">
          <p class="text-sm text-gray-500">Biaya Admin</p>
          <input
            v-model="dataAdd.biaya_admin"
            required
            class="form-input"
            placeholder="Masukkan Deskripsi"
          >
        </div>
        <div class="mb-2">
          <p class="text-sm text-gray-500">Logo</p>
          <input
            v-model="dataAdd.logo"
            required
            class="form-input"
            placeholder="Masukkan Deskripsi"
          >
        </div>
        <div class="mb-2">
          <p class="text-sm text-gray-500">Status</p>
          <select
            v-model="dataAdd.status"
            required
            class="form-input"
          >
            <option :value="1">Aktif</option>
            <option :value="0">Nonaktif</option>
          </select>
        </div>
        <div class="flex justify-end gap-4 mt-10">
          <button
            type="submit"
            class="btn-primary"
            :disabled="metode.loadingAction"
          >
            <i
              v-if="metode.loadingAction"
              class="fas fa-spinner animate animate-spin"
            ></i>
            <i
              v-else
              class="fa fa-save"
            ></i> Simpan</button>
          <button
            type="button"
            @click.prevent="show = false"
          ><i class="fas fa-times"></i> Tutup</button>
        </div>
      </form>
    </VueFinalModal>

  </div>

</template>
<script setup>
import { useMetodePenarikan } from "@/store/metode-penarikan";

import { VueFinalModal } from "vue-final-modal";

definePageMeta({
  middleware: "auth",
});
const { $toast } = useNuxtApp();
const metode = useMetodePenarikan();
const show = ref(false);
const mode = ref("");
const dataAdd = ref({
  nama: "",
  biaya_admin: "",
  status: 1,
  logo: "",
  id: "",
  act: "",
});
metode.getData();

const actionMetode = async () => {
  dataAdd.value.act = mode.value;
  await metode.actionMetodePenarikan(dataAdd.value);
  if (metode.messageAction) {
    $toast.success(metode.messageAction);
    show.value = false;
    metode.getData();
  }
  if (metode.errorAction) {
    $toast.error(metode.errorAction);
  }
};
</script>
