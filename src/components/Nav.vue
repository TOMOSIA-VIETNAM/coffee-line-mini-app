<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

import { BagIcon, ClockIcon, HomeIcon } from "@/components/Base/template/Icons";

import { useCartStore } from "@/store/cart";

const route = useRoute();
const currentPath = computed(() => route.path);

const listNavItem = ref([
  {
    title: "Home",
    icon: HomeIcon,
    path: "/",
  },
  {
    title: "History order",
    icon: ClockIcon,
    path: "/history-order",
  },
  {
    title: "Cart",
    icon: BagIcon,
    path: "/cart",
  },
]);

const cartStore = useCartStore();
</script>

<template>
  <div
    class="fixed bottom-0 w-screen h-[80px] bg-[#fff] px-5 shadow-lg flex justify-evenly items-center gap-2"
  >
    <div
      v-for="({ icon: Icon, path }, index) in listNavItem"
      :key="index"
      class="relative"
    >
      <div
        v-if="cartStore.cartContent.length && path === '/cart'"
        class="absolute top-[-4px] right-[-4px] bg-[red] text-[8px] text-[#fff] flex justify-center items-center font-medium w-[15px] h-[15px] rounded-full p-2"
      >
        {{ cartStore.cartContent.length }}
      </div>
      <router-link class="flex flex-col justify-center items-center" :to="path">
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
