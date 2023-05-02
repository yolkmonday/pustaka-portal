<template>
  <div class="p-2 my-3 text-sm rounded-md bg-red-100 text-red-500">
    <p><i class="fas fa-exclamation-circle"></i>
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>
