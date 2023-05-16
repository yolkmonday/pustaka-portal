<template>
  <ClientOnly>
    <vue-bottom-sheet ref="dbook">
      <h1>Lorem Ipsum</h1>
      {{ pr }}
      <h2>What is Lorem Ipsum?</h2>
      <p><strong>Lorem Ipsum</strong> is simply dummy text</p>
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
  console.log(a);
});
</script>
