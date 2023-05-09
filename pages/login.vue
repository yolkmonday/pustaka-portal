<template>
  <div class="max-w-[600px] mx-auto border min-h-screen bg-blue-600">
    <div class="flex justify-end items-end h-screen">
      <form class="w-full bg-white p-4 rounded-t-lg" @submit.prevent="signIn()">
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
    <loader-full v-if="auth.loading" />
  </div>
</template>

<script setup>
import { useAuth } from "../store/auth";

const auth = useAuth();

const user = reactive({
  email: "",
  password: "",
});

const signIn = () => {
  auth.signIn(user);
  if (auth.data.success) {
  }
};
</script>
