<script setup lang="ts">
import { computed } from 'vue'

import CartCard from '@/components/CartCard.vue'
import CartCardSkeleton from '@/components/CartCardSkeleton.vue'
import Nav from '@/components/Nav.vue'

import { toCurrency } from '@/shared/utils'
import { useCartStore } from '@/store/cart'
import { useProductStore } from '@/store/products'

const cartStore = useCartStore();
const productStore = useProductStore();

const formattedCart = computed(() => cartStore.formattedCart);
</script>

<template>
  <div class="p-4 pt-[30px] max-w-7xl mb-[80px] mx-auto">
    <h2 class="text-[#242424] text-base font-semibold mb-5">Your cart order</h2>
    <div v-if="!productStore.loaded" class="space-y-4">
      <CartCardSkeleton v-for="n in 15" :key="n" />
    </div>
    <div v-else-if="!formattedCart.length">
      <h1 class="text-xl">Cart is empty.</h1>
    </div>
    <div v-else class="mb-[80px] space-y-4">
      <CartCard
        v-for="(cartProduct, index) in formattedCart"
        :key="index"
        :cart-product="cartProduct"
      />
      <div class="w-full h-1 bg-[#F9F2ED]"></div>
      <div class="flex justify-between items-center gap-2 text-2xl py-4 md:text-4xl">
        <p class="text-[#242424] text-base font-semibold">Total order</p>
        <p class="text-[#242424] text-sm font-semibold">
          {{ toCurrency(cartStore.total) }}
        </p>
      </div>
      <router-link to="/checkout">
        <button
          type="button"
          class="w-full py-[16px] px-[20px] text-center text-base font-semibold text-[#fff] bg-[#C67C4E] transition duration-300 ease-out hover:bg-[#C67C4E]/80 rounded-[16px]"
        >
          Check Out
        </button>
      </router-link>
    </div>
  </div>

  <Nav/>
</template>
