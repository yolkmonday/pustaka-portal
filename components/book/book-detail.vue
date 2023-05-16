<template>
  <ClientOnly>
    <vue-bottom-sheet ref="dbook">
      <div class="p-3 min-h-[400px]">
        <div class="flex">
          <div class="w-4/12">
            <p
              class="h-28 capitalize text-blue-600 rounded-lg w-20 break-all bg-blue-50 text-[7px] flex items-center text-center p-4"
            >
              {{ b.biblio.title.slice(0, 50) }}...
            </p>
          </div>
          <div class="w-full">
            <div class="flex gap-2">
              <div class="text-[12px] text-gray-500 flex items-center gap-1">
                <Icon name="solar:user-circle-bold" />
                <span>
                  {{ b.author.author_name }}
                </span>
              </div>
              <div class="text-[12px] text-gray-500 flex items-center gap-1">
                <Icon name="solar:book-bold" />
                <span> {{ b.item.length }} Koleksi </span>
              </div>
            </div>

            <p class="font-bold capitalize block mt-1 text-sm">
              {{ b.biblio.title }}
            </p>
          </div>
        </div>
        <!-- {{ props.biblio }} -->
      </div>
    </vue-bottom-sheet>
  </ClientOnly>
</template>

<script setup>
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref } from "vue";
const props = defineProps({
  biblio: String,
});
const dbook = ref(null);
const b = props.biblio;
watch(props, (a, b) => {
  dbook.value.open();
});
</script>
