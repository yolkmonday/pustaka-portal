<template>
  <div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-full">
        <thead class="bg-gray-200">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">
              <p>Trx Id</p>
            </td>
            <td class="py-4 px-4">
              <p>Event</p>
            </td>
            <td class="py-4 px-4">
              <p>Status</p>
            </td>
            <td class="py-4 px-4">
              <p>Data</p>
            </td>
            <td class="py-4 px-4">
              <p>Created</p>
            </td>
          </tr>
        </thead>
        <tbody v-if="log.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>

        <tbody v-if="!log.loading && log.data">
          <tr
            v-for="(l, i) in data"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{ l.id }}</td>
            <td class="p-4">{{ l.trx_id }}</td>
            <td class="p-4">{{ l.event }}</td>
            <td class="p-4">{{ l.status }}</td>
            <td class="p-4">
              <Json :data="l.data" />
            </td>
            <td class="p-4">{{ useMomentDate(l.created_at) }}</td>
          </tr>
        </tbody>
        <tbody v-if="!log.data.length && !log.loading">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p class="text-xs">{{ log.error }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { useLogWebhook } from "@/store/log";
const props = defineProps({
  trx: { type: [String] },
});

const log = useLogWebhook();
const data = computed(() => {
  let dt = [];
  for (let i = 0; i < log.data.length; i++) {
    const element = log.data[i];
    element.data = parse(element.data);
    dt.push(element);
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

log.getData(props.trx);
</script>
