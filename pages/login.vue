<template>
  <div>
    <NuxtLayout>
      <div class="bg-primary-dark min-h-screen flex justify-center">
        <div class="bg-white w-[400px] p-6 shadow rounded-md self-center">
          <img
            src="/logo-h.png"
            class="h-12 mx-auto"
            alt=""
          />
          <p class="text-center font-bold text-primary">Admin</p>
          <form @submit.prevent="loginAct()">
            <div class="mb-4 md:mt-8 lg:mt-8 mt-4">
              <label
                for=""
                class="text-sm text-gray-500"
              >Email</label>
              <input
                v-model="user.email"
                required
                type="email"
                class="form-input"
              />
            </div>
            <div class="mb-4">
              <label
                for=""
                class="text-sm text-gray-500"
              >Password</label>
              <input
                v-model="user.password"
                required
                type="password"
                class="form-input"
              />
            </div>

            <error-span
              v-if="response.error"
              :message="response.message"
            />
            <div>
              <button
                :disabled="response.loading"
                type="submit"
                class="btn-primary w-full"
              >
                <i
                  v-if="response.loading"
                  class="fas fa-spinner animate animate-spin"
                ></i>
                <span v-else>Login</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useAuth } from "@/store/auth";
import axios from "axios";
import { useReCaptcha } from "vue-recaptcha-v3";
const { $toast } = useNuxtApp();
const auth = useAuth();
definePageMeta({
  layout: "no-auth",
});

useHead({
  titleTemplate: "Login - Tokopay Admin",
  bodyAttrs: {
    class: "test",
  },
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
    response.loading = true;
    response.error = false;
    const token = await recaptcha();
    if (token) {
      const res = await axios.post("/api/login", { ...user, token });
      response.loading = false;
      if (res.data.status) {
        auth.setLogin(true);
        auth.setData(res.data.data.admin);
        auth.setToken(res.data.data.jwt.token);
        window.location = "/";
      } else {
        response.error = true;
        response.message = res.data.error_msg;
      }
    } else {
      response.loading = false;
      $toast.error("Gagal mendapatkan token !");
    }
  } catch (error) {
    response.loading = false;
    $toast.error(error);
  }
};
</script>
