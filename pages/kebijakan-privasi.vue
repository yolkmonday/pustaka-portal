<template>
  <div class="max-w-[600px] min-h-screen mx-auto relative p-3">
    <div class="flex gap-2 text-gray-600" @click.prevent="router.push('/')">
      <Icon name="ic:round-arrow-back" size="24" />
      Kebijakan Privasi
    </div>
    <div class="px-3">
      <img src="/icon.png" class="h-12 mx-auto my-8" alt="" />
      <h1 class="text-lg font-bold">Kebijakan Privasi</h1>
      <p class="text-justify text-sm leading-6">
        Kami menghargai privasi Anda dan berkomitmen untuk melindungi informasi
        pribadi yang Anda berikan saat menggunakan aplikasi perpustakaan kami.
        Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan,
        menggunakan, dan melindungi informasi pribadi Anda. Harap dibaca dengan
        seksama:

        <br />

        Pengumpulan Informasi:
        <br />
        a. Informasi Pribadi: Saat Anda mendaftar dan menggunakan aplikasi
        perpustakaan, kami dapat mengumpulkan informasi pribadi seperti nama,
        alamat email, nomor telepon, dan informasi profil lainnya yang Anda
        berikan secara sukarela.
        <br />

        b. Aktivitas Pengguna: Kami dapat mengumpulkan informasi tentang
        aktivitas pengguna Anda di aplikasi, termasuk riwayat peminjaman, ulasan
        buku, preferensi, dan interaksi dengan fitur aplikasi lainnya.
        <br />
        <br />

        Penggunaan Informasi:
        <br />
        a. Penyediaan Layanan: Kami menggunakan informasi pribadi Anda untuk
        menyediakan layanan perpustakaan, termasuk pemrosesan peminjaman,
        pengiriman notifikasi, dan memberikan rekomendasi buku yang relevan.
        <br />
        b. Peningkatan Layanan: Informasi yang kami kumpulkan juga digunakan
        untuk memahami preferensi pengguna dan memperbaiki pengalaman pengguna
        di aplikasi.
        <br />
        c. Komunikasi: Kami dapat menggunakan informasi kontak yang Anda berikan
        untuk mengirimkan informasi terkait layanan, pembaruan, dan promosi
        terkait aplikasi perpustakaan, tetapi hanya jika Anda telah memberikan
        persetujuan sebelumnya.
        <br />
        <br />

        Keamanan Informasi:
        <br />
        a. Perlindungan Data: Kami menerapkan langkah-langkah keamanan yang
        sesuai untuk melindungi informasi pribadi Anda dari akses yang tidak
        sah, penggunaan, atau pengungkapan yang tidak sah.
        <br />
        b. Penyimpanan Data: Informasi Anda akan disimpan pada server yang aman
        dan dijaga kerahasiaannya sesuai dengan standar industri.

        <br />
        <br />
        Pengungkapan Informasi:
        <br />
        a. Mitra dan Layanan Pihak Ketiga: Kami dapat membagikan informasi
        pribadi Anda kepada mitra dan penyedia layanan pihak ketiga yang
        membantu dalam operasional aplikasi perpustakaan. Namun, kami hanya
        berbagi informasi yang diperlukan dan memastikan bahwa pihak ketiga
        tersebut juga melindungi informasi Anda sesuai dengan kebijakan privasi
        mereka sendiri.
        <br />
        b. Kewajiban Hukum: Kami dapat mengungkapkan informasi pribadi Anda jika
        diwajibkan oleh hukum atau jika kami percaya bahwa tindakan tersebut
        diperlukan untuk mematuhi hukum atau melindungi hak, properti, atau
        keselamatan kami atau pengguna lainnya.
        <br />
        <br />

        Hak Privasi Anda:
        <br />
        a. Akses dan Perubahan: Anda memiliki hak untuk mengakses dan
        memperbarui informasi pribadi Anda yang kami simpan dalam aplikasi.
        <br />
        b. Penghapusan: Jika Anda ingin menghapus informasi pribadi Anda dari
        aplikasi kami, silakan hubungi kami dan kami akan melakukan tindakan
        yang sesuai.
        <br />
        <br />

        Kebijakan privasi ini mengatur pengguna
      </p>
      <div class="h-40"></div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "no-auth",
});

useHead({
  title: "Kebijakan Privasi - Mainlibapp",
});

const router = useRouter();
</script>
