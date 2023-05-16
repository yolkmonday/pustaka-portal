<template>
  <ClientOnly>
    <vue-bottom-sheet ref="dbook" :click-to-close="false">
      <div class="p-3 min-h-[400px]">
        <div class="">
          <div class="w-4/12 mx-auto">
            <p
              class="h-32 capitalize text-blue-600 rounded-lg w-28 break-all bg-blue-50 text-[12px] flex items-center text-center p-4"
            >
              {{ props.biblio.biblio?.title?.slice(0, 50) }}...
            </p>
          </div>
        </div>
        <div class="flex gap-2 my-4">
          <div class="w-full">
            <div class="flex gap-2">
              <div class="text-sm text-gray-500 flex items-center gap-1">
                <Icon name="solar:user-circle-bold" />
                <span>
                  {{ props.biblio?.author?.author_name }}
                </span>
              </div>
              <div class="text-sm text-gray-500 flex items-center gap-1">
                <Icon name="solar:book-bold" />
                <span> {{ props.biblio?.item?.length }} Koleksi </span>
              </div>
            </div>

            <p class="font-bold capitalize block mt-1">
              {{ props.biblio?.biblio?.title }}
            </p>
          </div>
        </div>

        <!-- <div v-if="props.biblio?.item?.length">
          <div v-for="(it, i) in props.biblio?.item" :key="i">
            {{ it }}
          </div>
        </div> -->

        <div>
          <button
            type="submit"
            class="rounded-full mb-2 border border-red-500 bg-red-500 text-white w-full py-3 text-sm transform active:scale-95 transition-transform"
          >
            <Icon name="mdi:cards-heart" />
            Favoritkan
          </button>
        </div>
        <button
          @click.prevent="closeBtn"
          class="w-full text-center text-gray-600 text-sm"
        >
          Tutup
        </button>
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
const emit = defineEmits(["closed"]);
const dbook = ref(null);
const b = ref({});
const closeBtn = () => {
  emit("closed");
  dbook.value.close();
};
watch(
  props,
  (a, b) => {
    if (a.biblio.id) {
      props.biblio.value = props.biblio;
      dbook.value.open();
    } else {
      dbook.value.close();
    }
  },
  { deep: true }
);
</script>
