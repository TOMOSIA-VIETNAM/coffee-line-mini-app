<script setup lang="ts">
import { computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import ProductCardSkeleton from '@/components/ProductCardSkeleton.vue'
import { useProductStore } from '@/store/products'
import {useCategoryStore} from "@/store/categories";
import Toast from 'primevue/toast';

const productStore = useProductStore()
const categoryStore = useCategoryStore();
const products = computed(() => {
  const selectedCategoryId = categoryStore.selectedCategory;
  if (selectedCategoryId === null) {
    return productStore.list;
  }
  return productStore.list.filter(
      (product) => product.category_id === selectedCategoryId
  );
})
</script>

<template>
  <div class="p-4 max-w-7xl mx-auto">
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <h1 class="text-xl" v-if="!productStore.loaded ">All products are sold out</h1>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
  <Toast />
</template>
