<script setup lang="ts">
import { computed} from "vue";

import ProductCard from "@/components/ProductCard.vue";
import Search from "@/components/Search.vue";
import Filter from "@/components/Filter.vue";
import Nav from "@/components/Nav.vue";

import { useProductStore } from "@/store/products";
import { useCategoryStore } from "@/store/categories";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const products = computed(() => {
  const selectedCategoryId = categoryStore.selectedCategory;
  if (selectedCategoryId === null) {
    return productStore.list;
  }
  return productStore.list.filter(
    (product) => product.category_id === selectedCategoryId
  );
});

const setCategorySelected = (categoryId: string) => {
  categoryStore.setCategory(categoryId);
};

</script>

<template>
  <div
    class="h-[200px] px-[22px] pt-[30px] bg-gradient-to-r from-[#313131] to-[#111]"
  >
    <h2 class="text-base font-semibold text-[#D8D8D8] leading-[21px]">
      Enjoy your visit! ☕
    </h2>

    <div class="flex items-center gap-4 mt-[20px]">
      <Search />
      <Filter />
    </div>
    <div class="relative w-full mt-5 flex justify-center">
      <div
        class="absolute top-4 left-6 flex justify-center items-center bg-[#ED5151] w-[60px] h-[26px] rounded-lg text-[#fff] text-sm font-semibold leading-[17px]"
      >
        Promo
      </div>
      <div
        class="absolute bottom-3 left-6 w-[203px] h-[80px] drop-shadow-md text-[#fff] text-[32px] font-semibold leading-[40px]"
      >
        Buy one get one FREE
      </div>
      <img
        src="/images/banner.png"
        alt="coffee-mini-app"
        class="w-full h-[140px] rounded-xl object-cover"
      />
    </div>
  </div>

  <div
    class="px-4 mt-[100px] w-screen flex whitespace-nowrap no-scrollbar overflow-x-auto justify-start items-center gap-4"
  >
    <button
      type="button"
      @click="categoryStore.all()"
      class="text-center w-fit h-[29px] rounded-md px-[8px] py-[4px] text-sm font-semibold leading-[21px] transition duration-300 ease-in-out hover:bg-amber-700 hover:text-[#fff]"
      :class="{
        'text-[#fff] bg-[#C67C4E]': !categoryStore.selectedCategory,
        'bg-[#EDEDED59]/35': categoryStore.selectedCategory,
      }"
    >
      All Products
    </button>
    <button
      type="button"
      v-for="category in categoryStore.list"
      @click="setCategorySelected(category.id)"
      class="text-center w-fit h-[29px] rounded-md px-[8px] py-[4px] text-sm font-semibold leading-[21px] transition duration-300 ease-in-out hover:bg-amber-700 hover:text-[#fff]"
      :class="{
        'text-[#fff] bg-[#C67C4E]':
          categoryStore.selectedCategory === category.id,
        'text-[#000] bg-[#EDEDED59]/35':
          categoryStore.selectedCategory !== category.id,
      }"
    >
      {{ category.name }}
    </button>
  </div>

  <div class="mt-[10px] mb-[80px] px-4 max-w-7xl mx-auto">
    <div
      class="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 px-4 pb-6 overflow-y-auto"
    >
      <h1
        class="text-sm text-[#242424] font-medium"
        v-if="!productStore.loaded"
      >
        Product not found.
      </h1>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
  <Nav />
</template>
