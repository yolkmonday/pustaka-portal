<template>
  <div>
    <slot />
    <popup />
  </div>
</template>
<script setup>
</script>
<style>
.page-enter-active {
  transition: all 0.1s ease-in;
}
.page-leave-active {
  transition: all 0.1s ease-out;
}
.page-enter-from, .page-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: trangrayY(10px);
  opacity: 0;
}
</style>
