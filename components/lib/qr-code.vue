<template>
  <div class="hello">
    {{ options.data.value }}
    <QRCodeVue3
      value="m"
      :width="200"
      :height="200"
      :qrOptions="{ typeNumber: '0', mode: 'Byte', errorCorrectionLevel: 'Q' }"
      :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
      :dotsOptions="{ type: 'square', color: '#05004d' }"
      :cornersSquareOptions="{ type: 'square', color: '#0e013c' }"
    />
  </div>
</template>

<script>
import QRCodeVue3 from "qrcode-vue3";

export default {
  name: "HelloWorld",
  components: {
    QRCodeVue3,
  },
  data() {
    return {
      options: {
        width: 300,
        height: 300,
        data: "https://qr-code-styling.com",
        margin: 0,
        qrOptions: { typeNumber: "0", mode: "Byte", errorCorrectionLevel: "Q" },
        imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 0 },
        dotsOptions: { type: "square", color: "#05004d" },
        backgroundOptions: { color: "#ffffff" },
        image: "../assets/logo.png",
        dotsOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#6a1a4c",
            color2: "#6a1a4c",
            rotation: "0",
          },
        },
        cornersSquareOptions: { type: "square", color: "#0e013c" },
        cornersSquareOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#000000",
            color2: "#000000",
            rotation: "0",
          },
        },
        cornersDotOptions: { type: "square", color: "#04003d" },
        cornersDotOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#000000",
            color2: "#000000",
            rotation: "0",
          },
        },
        backgroundOptionsHelper: {
          colorType: { single: true, gradient: false },
          gradient: {
            linear: true,
            radial: false,
            color1: "#ffffff",
            color2: "#ffffff",
            rotation: "0",
          },
        },
      },
    };
  },
};
</script>
