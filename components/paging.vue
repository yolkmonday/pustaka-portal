<template>
  <div>
    <div class="flex-pagin">
      <div>
        <button
          :disabled="page === 1"
          :class="page === 1 ? 'text-gray-500' : ''"
          class="focus:outline-none"
          @click.prevent="page = page - 1"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        {{ page }}
        <button class="focus-outline-none" @click.prevent="page = page + 1">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
      <div>
        <input
          v-model="page"
          class="border rounded-md focus:outline-none px-3 py-1 text-sm w-20 mr-2 focus:border-bk-blue"
        />
        <select
          v-model="limit"
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
const page = ref(1);
const limit = ref(30);

// watch(limit, (a, b) => {
//   merchant.value = tmp.value.slice(0, r);
// });
// watch(page, (a, b) => {
//   if (a === 1) {
//     merchant.value = tmp.value.slice(0, limit.value);
//   } else {
//     merchant.value = tmp.value.slice((a - 1) * limit.value, a * limit.value);
//   }
//   if (a > 1 && !merchant.value.length) {
//     getListMerchant("next");
//   }
//   // kasih data kosong atau ndak
//   !merchant.value.length ? (empty.value = true) : (empty.value = false);
//   !merchant.value.length
//     ? (errorMsg.value = "Data tidak ditemukan")
//     : (errorMsg.value = "");
// });
</script>
