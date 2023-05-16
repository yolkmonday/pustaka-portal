<template>
  <ClientOnly>
    <vue-bottom-sheet ref="dbook">
      <div class="p-3">
        {{ props.biblio. }}
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

watch(props, (a, b) => {
  dbook.value.open();
});
</script>
