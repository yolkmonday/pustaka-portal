<template>
  <div>
    <div
      v-if="$nuxt.isOffline"
      class="fixed top-0 w-full text-white text-center py-2 text-xs"
    >
      Tidak terhubung, Periksa Jaringan Anda.
    </div>
    <div class="flex">
      <sidebar :data="fullBars" />
      <div class="w-full" :class="fullBars ? 'ml-0' : 'margin-bar'">
        <div
          class="w-full fixed top-0 left-0 z-10 h-14 bg-white flex items-center px-4 justify-between"
        >
          <div
            :class="!fullBars ? 'bars__' : ''"
            class="text-gray-500 cursor-pointer"
            @click.prevent="setFullBar()"
          >
            <i class="text-primary-dark text-xl fas fa-bars"></i>
          </div>
          <div v-if="user?.nama" class="flex items-center gap-3">
            <div class="text-right hidden md:block lg:block">
              <div class="text-sm font-bold">{{ user?.nama }}</div>
              <div class="text-xs">{{ user?.email }}</div>
            </div>
            <button
              class="focus:outline-none"
              @click="isShowMenu = isShowMenu ? false : true"
            >
              <img
                id="btn"
                class="h-8 w-8 object-cover rounded-full"
                :src="'https://ui-avatars.com/api/?name=' + user.nama"
                :alt="user.nama"
              />
            </button>
          </div>
          <div
            v-if="isShowMenu"
            class="bg-white shadow absolute rounded-b-md w-64 h-auto top-14 right-0 z-40"
          >
            <ul>
              <li class="py-3 px-6 hover:bg-primary-light">
                <button
                  class="text-gray-500 hover:text-primary-dark"
                  @click.prevent="router.push('/profil')"
                >
                  <i class="fas fa-user"></i>
                  Profil
                </button>
              </li>
              <li class="py-3 px-6 hover:bg-primary-light">
                <button
                  class="text-gray-500 hover:text-primary-dark"
                  @click.prevent="router.push('/profil/change-password')"
                >
                  <i class="fas fa-key"></i>
                  Ubah Password
                </button>
              </li>
              <li class="py-3 px-6 hover:bg-primary-light">
                <button
                  class="text-gray-500 hover:text-primary-dark"
                  @click.prevent="logout()"
                >
                  <i class="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="md:p-4 lg:p-6 p-0 mt-10">
          <NuxtPage />
          <div class="h-14"></div>
          <div class="text-center w-full text-gray-500">
            <span class="block text-xs">
              Tokopay Admin &copy; {{ useMoment().format("YYYY") }}
            </span>
            <span class="block text-[10px]">
              Last build {{ version?.last_build }} - {{ version?.version }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref } from "vue";
import { useAuth } from "@/store/auth";

const fullBars = ref(false);
const isShowMenu = ref(false);
const version = ref({});
const auth = useAuth();

const user = auth.data;

const route = useRoute();
const router = useRouter();

watch(route, (newV, oldV) => {
  axios.get("/api/version").then((r) => {
    if (r.data.last_build) {
      version.value = r.data;
    }
  });
  if (newV !== oldV) {
    location = location.origin + to.fullPath;
  }
});

const setFullBar = () => {
  return fullBars.value ? (fullBars.value = false) : (fullBars.value = true);
};

const logout = () => {
  useCookie("isLogin").value = null;
  useCookie("_tpa").value = null;
  window.location = "/login";
};
</script>

<style>
html,
body {
  background: rgb(248 250 252);
}

body::-webkit-scrollbar,
.scroll__::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

body::-webkit-scrollbar-track,
.scroll__::-webkit-scrollbar-track {
  background: #c8d0d4;
}

body::-webkit-scrollbar-thumb,
.scroll__::-webkit-scrollbar-thumb {
  background-color: #00345e;
  border-radius: 20px;
  border: 3px solid #00345e;
}

.bars__ {
  position: relative;
  left: 230px;
  transition: width 1s ease-in-out;
}

/* mobile */
@media only screen and (max-width: 480px) {
  .margin-bar {
    margin-left: 0px;
  }
}

/* desktop */
@media only screen and (min-width: 1200px) {
  .margin-bar {
    margin-left: 230px;
  }
}

.page-enter-active {
  transition: all 0.2s ease-in;
}
.page-leave-active {
  transition: all 0.2s ease-out;
}
.page-enter-from, .page-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: trangrayY(10px);
  opacity: 0;
}

.select2 {
  width: 100% !important;
}
</style>
