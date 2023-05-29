<template>
  <div class="max-w-[600px] mx-auto min-h-screen bg-blue-600 p-3">
    <div>
      <img src="/bg.png" alt="" class="w-3/4 mx-auto py-12" />
    </div>
    <div class="flex">
      <form
        class="w-full bg-white p-4 rounded-lg"
        @submit.prevent="registerAct()"
      >
        <div class="mb-8">
          <!-- <div class="h-10"></div> -->
          <h1 class="font-bold text-xl">Daftar</h1>
        </div>
        <div class="relative mb-4">
          <input
            v-model="user.nama"
            type="text"
            required
            class="rounded-lg p-2 outline-none w-full border-2 focus:border-blue-600"
          />
          <div
            class="text-xs absolute top-0 -mt-1 left-2 bg-white px-3 text-blue-600"
          >
            Nama (Sesuai KTP)
          </div>
        </div>
        <div class="relative mb-4">
          <input
            v-model="user.nik"
            type="number"
            required
            class="rounded-lg p-2 outline-none w-full border-2 focus:border-blue-600"
          />
          <div
            class="text-xs absolute top-0 -mt-1 left-2 bg-white px-3 text-blue-600"
          >
            NIK
          </div>
        </div>
        <div class="relative mb-4">
          <input
            v-model="user.email"
            type="email"
            required
            class="rounded-lg p-2 outline-none w-full border-2 focus:border-blue-600"
          />
          <div
            class="text-xs absolute top-0 -mt-1 left-2 bg-white px-3 text-blue-600"
          >
            Email
          </div>
        </div>
        <div class="relative mb-4">
          <input
            v-model="user.nomor_hp"
            type="text"
            inputmode="number"
            required
            class="rounded-lg p-2 outline-none w-full border-2 focus:border-blue-600"
          />
          <div
            class="text-xs absolute top-0 -mt-1 left-2 bg-white px-3 text-blue-600"
          >
            Nomor Whatsapp
          </div>
        </div>
        <div class="relative mb-4">
          <input
            type="password"
            v-model="user.password"
            required
            class="rounded-lg p-2 outline-none w-full border-2 focus:border-blue-600"
          />
          <div
            class="text-xs absolute top-0 -mt-1 left-2 bg-white px-3 text-blue-600"
          >
            Password
          </div>
        </div>
        <div class="relative mb-4">
          <input
            type="password"
            v-model="user.confirm_password"
            required
            class="rounded-lg p-2 outline-none w-full border-2 focus:border-blue-600"
          />
          <div
            class="text-xs absolute top-0 -mt-1 left-2 bg-white px-3 text-blue-600"
          >
            Ulangi Password
          </div>
        </div>

        <div class="mb-4">
          <ul class="list-disc">
            <li
              v-if="!password.has_minimum_lenth"
              class="flex text-red-500 text-xs"
            >
              - Password harus minimal 8 karakter
            </li>
            <li v-if="!password.has_special" class="flex text-red-500 text-xs">
              - Password harus mengandung karakter spesial
            </li>
            <li v-if="!password.has_number" class="flex text-red-500 text-xs">
              - Password harus mengandung angka
            </li>
            <li v-if="!password.has_alpha" class="flex text-red-500 text-xs">
              - Password harus mengandung huruf
            </li>
            <li
              v-if="user.confirm_password.length > 3 && !isPasswordSame"
              class="flex text-red-500 text-xs"
            >
              - Konfirmasi Password tidak sama
            </li>
          </ul>
        </div>

        <error-span
          v-if="!auth.data.success && auth.data.message"
          :message="auth.data.message"
        />

        <error-span v-if="response.error" :message="response.message" />

        <div>
          <button
            type="submit"
            :class="auth.loading ? 'bg-blue-500' : ''"
            class="rounded-full mb-2 border border-blue-600 bg-blue-600 text-white w-full py-3 text-sm transform active:scale-95 transition-transform"
          >
            Daftar
          </button>
          <div class="w-full text-center mt-4 text-sm">
            Sudah punya akun ?

            <NuxtLink to="/login" class="underline font-bold text-blue-600"
              >Login Sekarang</NuxtLink
            >
          </div>
        </div>
      </form>
    </div>
    <loader-full v-if="response.loading" />
  </div>
</template>

<script setup>
import { useAuth } from "@/store/auth";
import axios from "axios";
import { reactive } from "vue";
import { useReCaptcha } from "vue-recaptcha-v3";
const { $toast } = useNuxtApp();
const auth = useAuth();

definePageMeta({
  layout: "no-auth",
});

useHead({
  title: "Register - Mainlibapp",
});

const recaptchaInstance = useReCaptcha();

const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();
  // get the token, a custom action could be added as argument to the method
  const token = await recaptchaInstance?.executeRecaptcha("yourActionHere");
  return token;
};

const user = reactive({
  nama: "",
  nik: "",
  nomor_hp: "",
  email: "",
  password: "",
  confirm_password: "",
});

const isPasswordSame = computed(() => {
  return user.password === user.confirm_password;
});

const password = reactive({
  has_minimum_lenth: false,
  has_number: false,
  has_alpha: false,
  has_special: false,
});

const isNext = computed(() => {
  if (
    password.has_minimum_lenth &&
    password.has_number &&
    password.has_alpha &&
    password.has_special &&
    isPasswordSame
  ) {
    return true;
  } else {
    return false;
  }
});

watch(user, (a, b) => {
  password.has_minimum_lenth = b.password.length > 8;
  password.has_number = /\d/.test(b.password);
  password.has_alpha = /[A-Za-z]/.test(b.password);
  password.has_special = /[!@#\\$%\\^\\&*\\)\\(+=._-]/.test(b.password);
});

const response = reactive({
  error: false,
  loading: false,
  message: "",
});

const registerAct = async () => {
  try {
    if (isNext.value) {
      localStorage.removeItem("error_rg");
      response.loading = true;
      response.error = false;
      const token = await recaptcha();

      if (token) {
        const res = await axios.post("/api/register", { ...user, token });
        response.loading = false;
        if (res.data.success) {
          auth.setLogin(true);
          auth.setData(res.data.data);
          auth.setToken(res.data.data.token);
          window.location = "/";
        } else {
          response.error = true;
          response.message = res.data.message;
          if (res.data.data) {
            res.data.data.forEach((x) => {
              response.message = response.message + "-" + x;
            });
          }
        }
      } else {
        response.loading = false;
        $toast.error("Gagal mendapatkan token !");
      }
    } else {
      $toast.error("Periksa Password / Konfirmasi Passsword");
    }
  } catch (error) {
    response.loading = false;
    console.log(error);
    $toast.error(error);
  }
};
</script>
