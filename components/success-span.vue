<template>
  <div class="p-2 my-3 text-sm rounded-md bg-green-100 text-green-500">
    <p>
      <i class="fas fa-check-circle"></i>
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["message"],
};
</script>
