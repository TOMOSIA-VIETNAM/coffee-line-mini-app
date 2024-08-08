<script setup lang="ts">
import { computed, ref } from "vue";

import { BagIcon, HomeIcon } from "./Base/template/Icons";
import { useRoute } from "vue-router";

const route = useRoute();
const currentPath = computed(() => route.path);

const listNavItem = ref([
  {
    title: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    title: "Cart",
    icon: BagIcon,
    path: "/cart",
  },
]);
</script>

<template>
  <div
    class="fixed bottom-0 w-screen h-[80px] bg-[#fff] px-5 shadow-lg flex justify-evenly items-center gap-2"
  >
    <router-link
      v-for="({ icon: Icon, path }, index) in listNavItem"
      :key="index"
      class="flex flex-col justify-center items-center"
      :to="path"
    >
      <component
        :is="Icon"
        :color="currentPath === path ? '#C67C4E' : '#A2A2A2'"
      />
      <div
        :class="{
          visible: currentPath === path,
          invisible: currentPath !== path,
        }"
        class="w-[10px] h-[5px] mt-2 rounded-[18px] transition duration-300 ease-in-out bg-[#C67C4E]"
      ></div>
    </router-link>
  </div>
</template>

<style scoped>
@media (max-width: 1000px) {
  .cart {
    display: none;
  }
  .navbar-bottom {
    display: none;
  }
}
</style>
