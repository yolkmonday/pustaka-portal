<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div
      class="px-3 border-b justify-between pt-2 font-bold pb-2 text-lg flex items-center gap-1 text-gray-600"
    >
      <div>Riwayat</div>
      <div>
        <Icon name="solar:bill-list-bold" size="23" />
      </div>
    </div>
    <div
      v-if="!order.loading && !order.data.length"
      class="h-screen flex items-center justify-center"
    >
      <div class="text-center text-gray-400">
        <icon name="solar:notebook-square-broken" size="40" class="" />
        <span class="mt-3 block text-sm">Belum ada Riwayat</span>
      </div>
    </div>

    <div class="h-screen flex items-center justify-center" v-if="order.loading">
      <loader />
    </div>

    <div
      v-if="!order.loading && order.data.length"
      class="grid grid-cols-1 gap-3 p-3"
    >
      <div
        v-for="(b, i) in order.data"
        @click.prevent="router.push('/riwayat/' + b.order_id)"
        :key="i"
        class="border rounded-lg p-3 flex gap-2 relative items-center justify-between"
      >
        <div>
          <span class="font-bold"> #{{ b.order_id }} </span>
          <span class="text-xs block text-gray-500">{{
            useMomentDate(b.created_at)
          }}</span>
        </div>
        <div>
          <span
            v-if="!checkExpired(b.expired_at)"
            :class="b.status === 'pending' ? 'bg-yellow-500' : ''"
            class="text-xs p-1 rounded-md text-white"
            >{{ b.status }}</span
          >
          <span
            v-if="checkExpired(b.expired_at)"
            class="text-xs p-1 bg-red-500 rounded-md text-white"
            >Expired</span
          >
        </div>
      </div>
    </div>
    <bottom-menu />
  </div>
</template>

<script setup>
import { useOrder } from "@/store/order";
import moment from "moment";
const order = useOrder();
const router = useRouter();
definePageMeta({
  middleware: "auth",
});

order.getData();

const checkExpired = (val) => {
  const now = moment().unix();
  const expired = moment(val).unix();
  if (now > expired) {
    return true;
  } else {
    return false;
  }
};
</script>
