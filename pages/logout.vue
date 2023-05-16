<template>
  <div></div>
</template>

<script setup>
definePageMeta({
  layout: "no-auth",
});

const logout = () => {
  useCookie("isLogin").value = null;
  useCookie("_mk").value = null;
  useCookie("_md").value = null;

  if (!process.server) {
    window.location = "/login";
  }
};
logout();
</script>
