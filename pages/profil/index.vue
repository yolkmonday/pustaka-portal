<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p class="font-bold mb-6">Profil</p>

        <div class="grid grid-cols-2 gap-2 mb-3 border-b pb-1">
          <div>
            <p class="text-xs text-gray-500">ID</p>
            <p>#{{ admin.data.id }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Nama</p>
            <p>{{ admin.data.nama }}</p>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 mb-3 border-b pb-1">
          <div>
            <p class="text-xs text-gray-500">Email</p>
            <p>{{ admin.data.email }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">HP</p>
            <p>{{ admin.data.hp }}</p>
          </div>
        </div>

        <button
          @click.prevent="router.push('/profil/change-password')"
          class="text-primary mt-6"
        >
          <i class="fas fa-edit"></i> Ubah Password
        </button>
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
const router = useRouter();
const admin = useAdmin();
admin.getData();
</script>
