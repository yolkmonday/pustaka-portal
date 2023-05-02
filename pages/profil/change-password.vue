<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p class="font-bold mb-6">Ubah Password</p>
        <form @submit.prevent="admin.changePassword(change)">
          <div class="mb-2">
            <label for="" class="text-gray-600 text-sm">Password Lama</label>
            <input
              v-model="change.password_old"
              type="password"
              required
              class="form-input"
              placeholder="Masukkan Password Lama"
            />
          </div>
          <div class="mb-2">
            <label for="" class="text-gray-600 text-sm">Password Baru</label>
            <input
              v-model="change.password_new"
              type="password"
              required
              class="form-input"
              placeholder="Masukkan Password Baru"
            />
          </div>
          <div class="mb-2">
            <label for="" class="text-gray-600 text-sm"
              >Konfirmasi Password Baru</label
            >
            <input
              v-model="change.password_confirm"
              type="password"
              required
              class="form-input"
              placeholder="Masukkan Konfirmasi Password Baru"
            />
          </div>
          <error-span v-if="admin.errorChange" :message="admin.errorChange" />
          <success-span
            v-if="admin.response.status"
            :message="admin.response.message"
          />
          <button class="btn-primary w-48" type="submit">
            <i
              class="fas fa-spinner animate animate-spin"
              v-if="admin.loadingChange"
            ></i>
            <i v-else class="fas fa-save"></i> Simpan
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useAdmin } from "../../store/admin";

definePageMeta({
  middleware: "auth",
});
const admin = useAdmin();
const change = reactive({
  password_old: "",
  password_new: "",
  password_confirm: "",
});
admin.getData();
</script>
