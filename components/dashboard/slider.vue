<template>
  <Carousel>
    <Slide v-for="(s, i) in banner.data" :key="i">
      <div class="carousel__item">
        <img :src="s.img" alt="" class="rounded-lg w-full" />
      </div>
    </Slide>
    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useBanner } from "@/store/banner";
const banner = useBanner();
banner.getData();
</script>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
