<template>
  <div>
    <NuxtLink to="/login">too</NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>
