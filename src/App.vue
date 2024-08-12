<script setup lang="ts">
import {computed} from 'vue'
import Toast from 'primevue/toast'

import {usePersistCart} from './composables/usePersistCart'

import {useCartStore} from './store/cart'
import {useProductStore} from './store/products'
import {useCategoryStore} from "@/store/categories";

const productStore = useProductStore()
const cartStore = useCartStore()
const categoryStore = useCategoryStore()

productStore.fetchAll()
categoryStore.fetchAll()
usePersistCart()

const count = computed(() => cartStore.count)
const selectCategory = (categoryId: string | null) => {
  if (categoryId === null) {
    categoryStore.all()
  } else {
    categoryStore.setCategory(categoryId);
  }
};
const categories = computed(() => categoryStore.list)
</script>

<template>
  <Toast />
  <div class="drawer">
    <input id="drawer-input" type="checkbox" class="drawer-toggle">
    <div class="bg-base-100 text-base-content min-h-screen drawer-content">
      <router-view/>
    </div>
    <div class="drawer-side">
      <label for="drawer-input" class="drawer-overlay"/>
      <ul class="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
        <li>
          <router-link to="/" @click="selectCategory(null)">
            Home
          </router-link>
        </li>
        <li v-for="category in categories" :key="category.id" @click="selectCategory(category.id)">
          <router-link to="/">
            {{ category.name }}
          </router-link>
        </li>
        <li>
          <router-link to="/cart">
            Cart
            <div class="badge ml-2 badge-outline" v-text="count"/>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
