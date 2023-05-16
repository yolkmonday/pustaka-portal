<template>
  <div class="max-w-[600px] mx-auto h-screen bg-blue-600">
    <div class="flex justify-end items-end h-screen">
      <form
        class="w-full bg-white p-4 rounded-t-lg"
        @submit.prevent="loginAct()"
      >
        <div>
          <div class="h-10"></div>
        </div>
        <div class="relative mb-2">
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
        <div class="relative mb-2">
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
            Masuk
          </button>
          <button
            type="button"
            class="rounded-full border border-blue-600 text-blue-600 w-full py-3 text-sm transform active:scale-95 transition-transform"
          >
            Daftar
          </button>
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
  title: "Login - Mainlibapp",
});

const recaptchaInstance = useReCaptcha();

const recaptcha = async () => {
  // optional you can await for the reCaptcha load
  await recaptchaInstance?.recaptchaLoaded();
  // get the token, a custom action could be added as argument to the method
  const token = await recaptchaInstance?.executeRecaptcha("yourActionHere");
  return token;
};

const user = {
  email: "",
  password: "",
};

const response = reactive({
  error: false,
  loading: false,
  message: "",
});

const loginAct = async () => {
  try {
    localStorage.removeItem("error");
    response.loading = true;
    response.error = false;
    const token = await recaptcha();

    if (token) {
      const res = await axios.post("/api/login", { ...user, token });
      response.loading = false;
      console.log(res);
      if (res.data.success) {
        auth.setLogin(true);
        auth.setData(res.data.data);
        auth.setToken(res.data.data.token);
        window.location = "/";
      } else {
        response.error = true;
        response.message = res.data.message;
      }
    } else {
      response.loading = false;
      $toast.error("Gagal mendapatkan token !");
    }
  } catch (error) {
    response.loading = false;
    console.log(error);
    $toast.error(error);
  }
};
</script>
