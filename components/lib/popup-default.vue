<template>
  <ClientOnly>
    <vue-bottom-sheet
      ref="x"
      @closed="emit('closed')"
      :click-to-close="false"
      max-height="90%"
    >
      <div class="p-3 min-h-[300px]">
        <slot />
      </div>
    </vue-bottom-sheet>
  </ClientOnly>
</template>

<script setup>
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
const x = ref(null);
const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["closed"]);
watch(
  props,
  (a, b) => {
    if (props.show) {
      x.value.open();
    } else {
      x.value.close();
    }
  },
  { deep: true }
);
</script>
