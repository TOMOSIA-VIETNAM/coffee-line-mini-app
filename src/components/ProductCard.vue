<script setup lang="ts">
import { ref } from "vue";

import { useCartStore } from "@/store/cart";
import { apiUrl, toCurrency } from "@/shared/utils";
import Product from "@/types/product";

defineProps<{
  product: Product;
}>();

const cartStore = useCartStore();

const showIcon = ref(false);

const showSuccess = (id: string) => {
  cartStore.add(id);
  showIcon.value = true;

  setTimeout(() => {
    showIcon.value = false;
  }, 500);
};
</script>

<template>
  <div class="product w-full bg-white rounded-lg overflow-hidden">
    <Transition name="slide-fade" class="cart-icon">
      <p v-if="showIcon" class="cart-icon">🛒</p>
    </Transition>
    <figure class="w-full relative">
      <router-link :to="`/product/${product.id}`" class="hover:underline">
        <!-- rating badge -->
        <!-- <div
        class="absolute flex justify-center items-center px-3 py-1 bg-gradient-to-r from-[#313131]/30 to-[#111]/30 top-0 right-0 rounded-tr-xl rounded-bl-xl"
      >
        <div
          class="w-[12px] h-[12px] text-sm text-yellow-500 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
            class="w-4 h-4 mr-1"
          >
            <path
              d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.522-3.356c-.329-.314-.158-.888.283-.95l4.898-.696L8.465.792c.197-.39.73-.39.927 0l2.186 4.327 4.898.696c.441.063.612.636.283.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
            />
          </svg>
        </div>
        <p class="text-[#fff] text-[8px] font-semibold leading-[12px]">4.8</p>
      </div> -->
        <img
          :src="`${apiUrl}/storage/${product.images[0].path_name}`"
          alt="Card Image"
          class="w-full h-[128px] object-cover rounded-xl"
        />
      </router-link>
    </figure>
    <h2 class="text-lg font-semibold break-words line-clamp-2">
      <router-link :to="`/product/${product.id}`" class="hover:underline">{{
        product.title
      }}</router-link>
    </h2>
    <p
      class="text-[#A2A2A2] text-xs font-normal leading-[14px] mt-1 mb-2 line-clamp-2"
    >
      {{ product.description }}
    </p>
    <div class="flex justify-between items-center">
      <span class="text-xl font-bold text-gray-900">{{
        toCurrency(product.price)
      }}</span>
      <button
        class="bg-amber-800 w-8 h-8 text-white rounded-lg hover:bg-amber-700 focus:outline-none"
        @click="showSuccess(product.id)"
      >
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.product {
  display: grid;
  gap: 2px;
  grid-template-rows: subgrid;
  grid-row: span 4;
}
.cart-icon {
  z-index: 999;
}
.slide-fade-enter-active {
  transition: all 0.2s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate(150%, -150%);
  opacity: 0;
}
</style>
