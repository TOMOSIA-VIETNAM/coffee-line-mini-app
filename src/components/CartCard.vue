<script setup lang="ts">
import { MinusIcon, PlusIcon } from "@/components/Base/template/Icons";

import { useCartStore } from "@/store/cart";
import type { CartPreview } from "@/store/cart";
import { apiUrl, toCurrency } from "@/shared/utils";

defineProps<{
  cartProduct: CartPreview;
}>();

const cartStore = useCartStore();
</script>

<template>
  <div
    class="w-full flex justify-between items-center gap-2 overflow-hidden pt-4 px-2 border-t border-[#E3E3E3]"
  >
    <div class="w-[70%] flex gap-2">
      <router-link :to="`/product/${cartProduct.id}`">
        <img
          :src="`${apiUrl}/storage/${cartProduct.image}`"
          alt="Card Image"
          class="w-[60px] h-[60px] object-cover rounded-xl"
        />
      </router-link>
      <div class="w-[70%]">
        <h2
          class="text-sm text-[#242424] font-semibold mb-2 line-clamp-2 break-words"
        >
          <router-link
            :to="`/product/${cartProduct.id}`"
            class="hover:underline"
          >
            {{ cartProduct.title }}
          </router-link>
        </h2>
        <p class="text-xs font-normal text-[#C67C4E]">
          {{ toCurrency(cartProduct.cost) }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-3 items-center gap-2">
      <button
        class="flex justify-center items-center border border-[#F9F2ED] w-6 h-6 bg-[#fff] rounded-full hover:bg-[#F9F2ED] p-1"
        @click="cartStore.remove(cartProduct.id)"
      >
        <MinusIcon />
      </button>
      <span
        class="text-sm text-[#2A2A2A] font-semibold text-center leading-[21px]"
        >{{ cartProduct.quantity }}</span
      >
      <button
        class="flex justify-center items-center border border-[#F9F2ED] w-6 h-6 bg-[#fff] rounded-full hover:bg-[#F9F2ED] p-1"
        @click="cartStore.add(cartProduct.id)"
      >
        <PlusIcon />
      </button>
    </div>
  </div>
</template>
