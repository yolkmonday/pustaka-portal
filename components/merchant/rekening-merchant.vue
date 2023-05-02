<template>
  <div>
    <div class="overflow-x-auto grid grid-cols-1 w-full">
      <table class="mt-2 w-max min-w-full">
        <thead class="bg-gray-200">
          <tr class="text-xs">
            <td class="py-4 px-4">#ID</td>
            <td class="py-4 px-4">
              <p>Metode</p>
            </td>
            <td class="py-4 px-4">No Rekening</td>
            <td class="py-4 px-4">Nama Rekening</td>
            <td class="py-4 px-4">
              <p>Status</p>
            </td>
          </tr>
        </thead>
        <tbody v-if="rekening.loading">
          <tr>
            <td colspan="14">
              <loader />
            </td>
          </tr>
        </tbody>

        <tbody v-if="!rekening.loading && rekening.data">
          <tr
            v-for="(m, i) in rekening.data"
            :key="i"
            class="tr"
          >
            <td class="p-4">#{{m.id}}</td>
            <td class="p-4">{{ m.metode_nama }}</td>
            <td class="p-4">{{ m.rekening }}</td>
            <td class="p-4">{{ m.rekening_pemilik }}</td>
            <td class="p-4">
              <p
                :class="m.status ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'"
                class="rounded-full w-max px-3 py-1"
              >{{ m.status ? 'Aktif' : 'Nonaktif' }}</p>
            </td>
          </tr>
        </tbody>
        <tbody v-if="!rekening.data.length && !rekening.loading">
          <tr class="text-sm">
            <td
              colspan="14"
              class="text-center p-4"
            >
              <p class="text-xs">{{ rekening.error }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { useRekening } from "@/store/rekening";

const props = defineProps({
  id: { type: [String] },
});

const rekening = useRekening();
rekening.getData(props.id);
</script>
