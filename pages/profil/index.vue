<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div
      class="px-3 border-b justify-between pt-2 font-bold pb-2 flex items-center gap-1 text-gray-600"
    >
      <div>Profil</div>
      <div>
        <Icon name="solar:user-circle-bold" size="23" />
      </div>
    </div>

    <div class="p-3">
      <ul>
        <li></li>
      </ul>
    </div>
    <div class="p-3">
      <button
        type="button"
        @click.prevent="router.push('/logout')"
        class="rounded-full mb-2 border border-blue-600 bg-blue-600 text-white w-full py-3 text-sm transform active:scale-95 transition-transform"
      >
        Keluar
      </button>
      <p class="text-xs text-center text-gray-500">Versi 0.4-beta</p>
    </div>

    <bottom-menu />
  </div>
</template>

<script setup>
const router = useRouter();
definePageMeta({
  middleware: "auth",
});
</script>
