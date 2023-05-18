<template>
  <div>
    <div
      class="grid bg-white shadow grid-cols-5 fixed border-t bottom-0 left-0 w-full py-2"
    >
      <div
        class="flex justify-center items-center"
        @click.prevent="router.push('/')"
        :class="includeRoute === '/' ? 'text-blue-500' : 'text-gray-500'"
      >
        <div class="text-center">
          <Icon name="solar:home-smile-bold" size="28" />
          <span class="text-[8px] block w-full">Beranda</span>
        </div>
      </div>
      <div
        class="flex justify-center items-center"
        @click.prevent="router.push('/riwayat')"
        :class="includeRoute === '/riwayat' ? 'text-blue-500' : 'text-gray-500'"
      >
        <div class="text-center">
          <Icon name="solar:bill-list-bold" size="28" />
          <span class="text-[8px] block w-full">Riwayat</span>
        </div>
      </div>
      <div
        class="flex justify-center items-center"
        @click.prevent="router.push('/scan')"
      >
        <div class="text-center">
          <div
            class="w-12 h-12 -mt-6 rounded-full bg-blue-600 text-white flex items-center justify-center"
          >
            <Icon name="solar:code-scan-broken" size="18" />
          </div>
          <span class="text-[8px] block w-full mt-1">Scan</span>
        </div>
      </div>

      <div
        class="flex justify-center items-center"
        @click.prevent="router.push('/favorit')"
        :class="includeRoute === '/favorit' ? 'text-blue-500' : 'text-gray-500'"
      >
        <div class="text-center">
          <Icon name="solar:chat-round-like-bold" size="28" />
          <span class="text-[8px] block w-full">Favorit</span>
        </div>
      </div>

      <div
        class="flex justify-center items-center"
        @click.prevent="router.push('/profil')"
        :class="includeRoute === '/profil' ? 'text-blue-500' : 'text-gray-500'"
      >
        <div class="text-center">
          <Icon name="solar:user-circle-bold" size="28" />
          <span class="text-[8px] block w-full">Profil</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

const includeRoute = computed(() => {
  return route.fullPath.replace(/[0-9]/g, "");
});
</script>
