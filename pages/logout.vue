<template>
  <div></div>
</template>

<script setup>
definePageMeta({
  layout: "no-auth",
});

const logout = () => {
  useCookie("isLogin").value = null;
  useCookie("_tpa").value = null;
  if (!process.server) {
    window.location = "/login";
  }
};
logout();
</script>
