<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import {apiUrl, toCurrency} from '@/shared/utils'
import Product from "@/types/product";

defineProps<{
  product: Product
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <figure class="px-4 pt-4">
      <img
        :src="`${apiUrl}/storage/${product.images[0].path_name}`"
        alt="Card Image"
        class="w-full h-40 object-cover rounded-lg"
      >
    </figure>
    <div class="p-4">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold">
          <router-link :to="`/product/${product.id}`" class="hover:underline">
            {{ product.title }}
          </router-link>
        </h2>
<!--        <div class="text-sm text-yellow-500 flex items-center">-->
<!--          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="w-4 h-4 mr-1">-->
<!--            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73-3.522-3.356c-.329-.314-.158-.888.283-.95l4.898-.696L8.465.792c.197-.39.73-.39.927 0l2.186 4.327 4.898.696c.441.063.612.636.283.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>-->
<!--          </svg>-->
<!--          {{ product.rating }}-->
<!--        </div>-->
      </div>
      <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-xl font-bold text-gray-900">{{ toCurrency(product.price) }}</span>
        <button class="bg-amber-800 w-8 h-8 text-white rounded-lg hover:bg-amber-700 focus:outline-none"
                @click="cartStore.add(product.id)">+</button>
      </div>
      <div class="flex justify-end mt-4">

      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
</style>

