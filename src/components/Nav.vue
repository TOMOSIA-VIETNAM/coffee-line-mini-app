<script setup lang="ts">
import {computed, ref} from 'vue'
import Search from './Search.vue'
import {useCartStore} from '@/store/cart'
import {useCategoryStore} from "@/store/categories";

const cartStore = useCartStore()
const showDropdown = ref<boolean>(false);
const count = computed(() => cartStore.count)
const categoryStore = useCategoryStore()

const selectCategory = (categoryId: string | null) => {
  if (categoryId === null) {
    categoryStore.all();
  } else {
    categoryStore.setCategory(categoryId);
  }
  showDropdown.value = false;
};

const categories = computed(() => categoryStore.list)
</script>

<template>
  <div class="navbar shadow-lg bg-neutral text-neutral-content justify-center">
    <div class="container justify-between">
      <div class="flex-none lg:hidden">
        <label for="drawer-input" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               class="inline-block w-6 h-6 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </label>
      </div>
      <div class="flex-none px-2 mx-2">
      <span class="text-lg font-bold">
        Shopping Cart</span>
      </div>
      <div class="flex-1 lg:flex-none">
        <Search/>
        <router-link class="btn btn-ghost btn-sm rounded-btn cart" to="/cart">
          Cart
          <div class="badge ml-2 badge-outline" v-text="count"/>
        </router-link>
      </div>
    </div>
  </div>
  <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content border-t-2 justify-center navbar-bottom">
    <div class="flex-1 mx-2 container">
      <div class="items-stretch hidden lg:flex">
        <router-link class="btn btn-ghost btn-sm rounded-btn" to="/" @click="selectCategory(null)">
          Home
        </router-link>
        <router-link to="/" class="btn btn-ghost btn-sm rounded-btn" v-for="category in categories" :key="category.id" @click="selectCategory(category.id)">
          {{ category.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 1000px) {
  .cart{
    display: none;
  }
  .navbar-bottom{
    display: none;
  }
}
</style>

