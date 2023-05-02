<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between">
      <p class="font-bold">List Hari Libur</p>
    </div>
    <div class="flex justify-end px-4">
      <button
        class="btn-primary"
        @click.prevent="
          (dataAdd.tanggal = ''), (dataAdd.deskripsi = ''), (show = true)
        "
      >
        <i class="fas fa-calendar-times"></i> Tambah Hari Libur
      </button>
    </div>
    <div
      v-if="!hariLibur.loading"
      class="mt-4"
    >
      <client-only>
        <vue-cal
          active-view="month"
          locale="id"
          :disable-views="['years', 'year', 'week', 'day']"
          :events="hariLibur.data"
        />
      </client-only>
    </div>
    <div v-if="hariLibur.loading">
      <loader />
    </div>
    <!-- <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-300">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">Tanggal</td>
            <td class="py-4 px-4">Deskripsi</td>
            <td></td>
          </tr>
        </thead>
        <tbody v-if="hariLibur.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>
        <tbody v-if="!hariLibur.loading && !hariLibur.data.length">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p>{{ hariLibur.error }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!hariLibur.loading && hariLibur.data.length">
          <tr
            v-for="(m, i) in hariLibur.data"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{ m.id }}</td>
            <td class="p-4">
              <input
                v-if="dataEdit.id === m.id"
                v-model="dataEdit.tanggal"
                type="date"
                class="form-input"
              >
              <p v-else>
                {{ useMoment(m.tanggal).format('DD MMMM YYYY') }}

              </p>
            </td>
            <td class="p-4">
              <input
                v-if="dataEdit.id === m.id"
                v-model="dataEdit.deskripsi"
                class="form-input"
              >
              <p v-else>
                {{ m.deskripsi }}

              </p>
            </td>
            <td class="p-4">
              <div
                v-if="dataEdit.id === m.id"
                class="flex gap-x-2 items-center"
              >
                <button
                  :disabled="hariLibur.loadingEdit"
                  class="text-green-500"
                  @click.prevent="actionEdit()"
                >
                  <i
                    v-if="hariLibur.loadingEdit"
                    class="fas fa-spinner animate animate-spin"
                  ></i>
                  <i
                    v-else
                    class="fas fa-save"
                  ></i> Simpan</button>
                <button
                  class="text-orange-500"
                  @click.prevent="dataEdit = {}"
                ><i class="fas fa-times"></i> Batal</button>
              </div>
              <button
                v-else
                class="focus:outline-none text-orange-500"
                @click.prevent="dataEdit = {...m}"
              ><i class="fas fa-edit"></i> Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->

    <VueFinalModal
      v-model="show"
      class="flex justify-center items-center"
      content-class="bg-white rounded p-4 w-1/2"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
      :clickToClose="false"
    >
      <h1 class="text-center font-bold mb-4">Tambah Hari Libur</h1>
      <form @submit.prevent="actionInsert()">
        <div class="mb-2">
          <p class="text-sm text-gray-500">Tanggal</p>
          <input
            v-model="dataAdd.tanggal"
            required
            type="date"
            class="form-input"
          />
        </div>
        <div class="mb-2">
          <p class="text-sm text-gray-500">Deskripsi</p>
          <input
            v-model="dataAdd.deskripsi"
            required
            class="form-input"
            placeholder="Masukkan Deskripsi"
          />
        </div>
        <div class="flex justify-end gap-4 mt-10">
          <button
            type="submit"
            class="btn-primary"
            :disabled="hariLibur.loadingAction"
          >
            <i
              v-if="hariLibur.loadingAction"
              class="fas fa-spinner animate animate-spin"
            ></i>
            <i
              v-else
              class="fa fa-save"
            ></i> Simpan
          </button>
          <button
            type="button"
            @click.prevent="show = false"
          >
            <i class="fas fa-times"></i> Tutup
          </button>
        </div>
      </form>
    </VueFinalModal>
  </div>
</template>
<script setup>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import { useHariLibur } from "@/store/hari-libur";
import { VueFinalModal } from "vue-final-modal";
import { reactive } from "vue";

definePageMeta({
  middleware: "auth",
});
const { $toast } = useNuxtApp();
const hariLibur = useHariLibur();
const dataEdit = ref({});
const show = ref(false);
const dataAdd = ref({
  tanggal: "",
  deskripsi: "",
});
const liburan = reactive([]);
const loading = ref(true);
hariLibur.getData();

hariLibur.data.forEach((dt) => {
  liburan.push({
    start: dt.tanggal,
    end: dt.tanggal,
    title: dt.deskripsi,
  });
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

const actionEdit = async () => {
  await hariLibur.editData(dataEdit.value);
  if (hariLibur.messageAction) {
    $toast.success(hariLibur.messageAction);
    dataEdit.value = {};
    hariLibur.getData();
  }
  if (hariLibur.errorAction) {
    $toast.error(hariLibur.errorAction);
  }
};
const actionInsert = async () => {
  await hariLibur.insertData(dataAdd.value);
  if (hariLibur.messageAction) {
    $toast.success(hariLibur.messageAction);
    hariLibur.getData();
    dataAdd.value = {
      tanggal: "",
      deskripsi: "",
    };
  }
  if (hariLibur.errorAction) {
    $toast.error(hariLibur.errorAction);
  }
};
</script>
<style>
.vuecal__cell {
  height: 50px;
}
.vuecal__cell--has-events {
  background-color: #ff0000;
  color: white;
}
.vuecal__cell-events-count {
  display: none;
}
</style>
