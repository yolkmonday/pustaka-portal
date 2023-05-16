<template>
  <ClientOnly>
    <vue-bottom-sheet ref="msg">
      <div class="p-4 text-center min-h-[200px]">
        <div class="pt-4">
          <Icon
            v-show="!popup.isError"
            name="mdi:success-circle"
            class="text-green-500 mx-auto animate animate-bounce"
            size="84"
          />
          <Icon
            v-show="popup.isError"
            name="clarity:times-circle-solid"
            class="text-red-500 mx-auto animate animate-bounce"
            size="84"
          />
        </div>

        <div class="text-center font-bold text-gray-500">
          {{ popup.msg }}
        </div>
      </div>
    </vue-bottom-sheet>
  </ClientOnly>
</template>

<script setup>
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref } from "vue";
import { usePopup } from "@/store/popup";

const msg = ref(null);
const popup = usePopup();
watch(
  popup,
  (a, b) => {
    msg.value.open();
  },
  { deep: true }
);
</script>
