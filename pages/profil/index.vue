<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative">
    <div
      class="px-3 border-b justify-between pt-2 font-bold pb-2 text-lg flex items-center gap-1 text-gray-600"
    >
      <div>Profil</div>
      <div>
        <Icon name="solar:user-circle-bold" size="23" />
      </div>
    </div>

    <div class="py-14 bg-blue-600 flex items-center justify-center">
      <div class="text-center">
        <img
          class="rounded-full h-28"
          :src="`https://ui-avatars.com/api/?background=fff&color=2757E3&name=${user.nama}`"
          alt=""
        />
        <div class="text-lg pt-3 text-white font-bold w-full text-center">
          {{ user.nama }}
        </div>
      </div>
    </div>
    <div class="px-3 mt-3">
      <h1 class="font-bold">Akun</h1>
      <div class="p-3 rounded-xl border mt-2">
        <ul>
          <li
            class="border-b py-3 flex items-center gap-2 justify-between w-full"
          >
            <div class="flex items-center gap-2">
              <icon name="solar:user-circle-broken" />
              Ubah Profil
            </div>
            <div>
              <icon name="solar:alt-arrow-right-linear" />
            </div>
          </li>
          <li class="py-3 flex items-center gap-2 justify-between w-full">
            <div class="flex items-center gap-2">
              <icon name="solar:lock-password-broken" />
              Ubah Password
            </div>
            <div>
              <icon name="solar:alt-arrow-right-linear" />
            </div>
          </li>
        </ul>
      </div>
      <h1 class="font-bold mt-3">Bantuan</h1>
      <div class="p-3 rounded-xl border mt-2">
        <ul>
          <li
            class="border-b py-3 flex items-center gap-2 justify-between w-full"
          >
            <div class="flex items-center gap-2">
              <icon name="solar:help-broken" />
              Bantuan
            </div>
            <div>
              <icon name="solar:alt-arrow-right-linear" />
            </div>
          </li>
          <li class="py-3 flex items-center gap-2 justify-between w-full">
            <div class="flex gap-2 items-center">
              <icon name="solar:notebook-broken" />

              Laporan Masalah
            </div>
            <div>
              <icon name="solar:alt-arrow-right-linear" />
            </div>
          </li>
        </ul>
      </div>
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
    <div class="h-20"></div>
    <bottom-menu />
  </div>
</template>

<script setup>
const router = useRouter();
definePageMeta({
  middleware: "auth",
});

const user = useCookie("_md").value;
</script>
