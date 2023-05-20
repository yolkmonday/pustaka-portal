<template>
  <div>
    <ClientOnly>
      <qr-stream @decode="onDecode" @init="logErrors" class="mb"></qr-stream>
      <div class="result">Result: {{ data }}</div>
    </ClientOnly>
  </div>
</template>


<script setup>
const data = ref("");
const onDecode = (val) => {
  console.log(val);
  alert(val);
};
const logErrors = async (val) => {
  console.log(val);
};
</script>

