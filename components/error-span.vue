<template>
  <div class="p-2 my-3 rounded-md bg-red-100 text-red-500">
    <span class="block text-[10px]">
      <Icon name="iconamoon:sign-times-circle-fill" size="12" /> Terjadi
      Kesalahan
    </span>
    <p class="text-xs mt-1">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>
