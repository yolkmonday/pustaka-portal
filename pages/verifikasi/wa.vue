<template>
  <div class="max-w-[600px] min-h-screen mx-auto p-3">
    <div class="flex gap-2 text-gray-600" @click.prevent="router.push('/')">
      <Icon name="ic:round-arrow-back" size="24" />
      Verifikasi Whatsapp
    </div>
    <div class="h-20"></div>
    <div class="text-gray-600">
      <span class="text-sm"> Kami akan mengirim kode OTP ke nomor </span>
      <span class="text-lg font-bold block">
        {{ useHp(auth.me.nomor_hp) }}
      </span>
      <button
        @click.prevent="verifikasi.sendOTP()"
        class="text-blue-600 underline text-sm font-bold"
      >
        Kirim Sekarang
      </button>
    </div>
    <div class="w-full mt-4">
      <v-otp-input
        ref="otpInput"
        v-model:value="bindModal"
        input-classes="border rounded-md p-2 w-12 mr-2"
        separator=""
        :num-inputs="4"
        :should-auto-focus="true"
        input-type="numeric"
        :conditionalClass="['one', 'two', 'three', 'four']"
        :placeholder="['', '', '', '']"
        @on-change="handleOnChange"
      />
      <p class="text-xs text-gray-500 mt-3">Masukkan OTP yang telah dikirim</p>
    </div>

    <div class="absolute bottom-2 left-0 w-full px-3">
      <button
        @click.prevent="verif()"
        type="button"
        :disabled="Otp.length < 4 || verifikasi.loading"
        :class="
          Otp.length < 4
            ? 'bg-gray-500 border-gray-500 '
            : 'bg-blue-600 border-blue-600 '
        "
        class="rounded-full mb-2 border text-white w-full py-3 text-sm transform active:scale-95 transition-transform"
      >
        Verifikasi
      </button>
    </div>

    <loader v-if="auth.loading" />
    <loader-full v-if="verifikasi.loading" />
  </div>
</template>

<script setup>
import { useAuth } from "@/store/auth";
import { useVerifikasi } from "@/store/verifikasi";

import VOtpInput from "vue3-otp-input";
import { usePopup } from "@/store/popup";
const auth = useAuth();
const popup = usePopup();
const verifikasi = useVerifikasi();

const router = useRouter();
definePageMeta({
  middleware: "auth",
});

const bindModal = ref("");
const Otp = ref("");

// const handleOnComplete = (value) => {
//   console.log("OTP completed: ", value);
// };

const handleOnChange = (value) => {
  Otp.value = value;
};

auth.getMe();
const verif = () => {
  verifikasi.verifOTP(Otp).then((x) => {
    if (x.success) {
      popup.setPopup(x.message, false);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } else {
      popup.setPopup(x.message, true);
    }
  });
};
</script>
