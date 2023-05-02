<template>
  <div class="bg-white rounded-md py-4">
    <div class="px-4 mb-6 flex justify-between">
      <p class="font-bold">List Payment Vendor</p>
    </div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-200">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">Nama</td>
            <td class="py-4 px-4">Status</td>
          </tr>
        </thead>
        <tbody v-if="vendor.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>
        <tbody v-if="!vendor.loading && vendor.error">
          <tr class="text-sm">
            <td colspan="14" class="text-center p-4">
              <p>Data Not Found</p>
              <p class="text-xs">{{ vendor.error }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!vendor.loading && vendor.data.length">
          <tr v-for="(m, i) in vendor.data" :key="i" class="tr">
            <td class="p-4">#{{ m.id }}</td>
            <td class="p-4">{{ m.name }}</td>

            <td>
              <p
                :class="
                  m.status === 1
                    ? 'bg-green-100 text-green-500'
                    : m.status === 0
                    ? 'bg-red-100 text-red-500'
                    : 'bg-orange-100 text-orange-500'
                "
                class="rounded-full px-3 w-max py-1"
              >
                {{ m.status ? "Aktif" : "Non-Aktif" }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useVendor } from "@/store/vendor";
definePageMeta({
  middleware: "auth",
});

const page = ref(1);
const limit = ref(30);
const vendor_id = ref("");

const payload = computed(() => {
  return {
    page: page.value,
    limit: limit.value,
    vendor_id: vendor_id.value,
  };
});

const vendor = useVendor();

vendor.getData();
</script>
