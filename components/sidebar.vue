<template>
  <div
    id="sidebar"
    :class="data ? 'side_hide' : 'sidebar'"
    class="z-40 fixed min-h-screen bg-primary"
  >
    <nuxt-link
      to="/"
      class="px-6 h-20 flex items-center gap-x-1"
    >
      <img
        src="/tokopay-w.png"
        class="h-8 mx-auto"
        alt=""
      />
    </nuxt-link>
    <ul
      v-if="menu.length"
      class=""
    >
      <li
        v-for="(m, index) in menu"
        :key="index"
        :class="
          m.link === route.fullPath || includeRoute === m.subRoute
            ? 'font-bold bg-gray-100 text-primary'
            : 'text-white'
        "
        class="py-4 font-tv"
      >
        <div
          v-if="!m.child.length"
          id="menu"
          class=""
        >
          <div
            id="menu"
            @click.prevent="dataIndex = ''"
          >
            <nuxt-link
              :to="m.link"
              class="flex pl-6 items-center gap-3"
            >
              <i :class="m.icon"></i>
              <span
                id="menu"
                class="text-sm"
              >
                {{ m.label }}
              </span>
            </nuxt-link>
          </div>
        </div>
        <div v-else>
          <div
            class="flex items-center justify-between cursor-pointer"
            @click.prevent="dataIndex = dataIndex === index ? '' : index"
          >
            <div class="flex pl-6 items-center gap-3">
              <i :class="m.icon"></i>
              <span class="text-sm">
                {{ m.label }}
              </span>
            </div>
            <div
              v-if="m.child.length"
              class="pr-4"
            >
              <i
                v-if="dataIndex !== index"
                class="fas fa-chevron-right"
              ></i>
              <i
                v-else
                class="fas fa-chevron-down"
              ></i>
            </div>
          </div>
          <ul
            :class="index === dataIndex ? 'block' : 'hidden'"
            class="mt-3"
          >
            <li
              v-for="(c, j) in m.child"
              id="menu"
              :key="j"
              :class="
                c.link === route.fullPath || includeRoute === c.subRoute
                  ? 'bg-white font-bold text-primary'
                  : 'text-white'
              "
              class="py-3 pl-4 font-tv"
            >
              <nuxt-link
                :to="c.link"
                class="flex pl-6 items-center gap-3"
              >
                <i :class="c.icon"></i>
                <span
                  id="menu"
                  class="text-sm"
                >
                  {{ c.label }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import menu from "@/lib/menu.json";
import { ref, computed, watch } from "vue";
const props = defineProps({
  data: { type: [Boolean] },
});
const dataIndex = ref("");
const sameSub = ref(false);
const route = useRoute();
const routeSplit = ref("");

const includeRoute = computed(() => {
  const x = route.fullPath.split("/");
  routeSplit.value = x[1];
  if (route.matched[0].path.includes(":")) {
    return route.matched[0].path;
  } else {
    return route.fullPath.replace(/[0-9]/g, "");
  }
});

watch(route, (newValue, oldValue) => {
  setActive();
});

const setActive = () => {
  if (!process.server) {
    document.title =
      route.fullPath.replaceAll("/", " ").toUpperCase() + " - Admin TokoPay";
  }

  if (route.fullPath === includeRoute.value) {
    sameSub.value = true;
  } else {
    sameSub.value = false;
  }
  for (let index = 0; index < menu.length; index++) {
    if (menu[index].child !== null) {
      for (let j = 0; j < menu[index].child.length; j++) {
        if (
          menu[index].child[j].link === route.fullPath ||
          includeRoute.value === menu[index].child[j].subRoute
        ) {
          dataIndex.value = index;
        }
      }
    }
  }
};
setActive();
</script>

<style>
.sidebar {
  width: 235px;
  transition: width 1s ease-in;
}
.side_hide {
  width: 0px;
  display: none;
  transition: width 1s ease-in-out;
}
</style>
