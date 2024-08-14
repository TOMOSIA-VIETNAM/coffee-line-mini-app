<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import ProductCard from "@/components/ProductCard.vue";
import Search from "@/components/Search.vue";
import Nav from "@/components/Nav.vue";
import { FilterIcon } from "@/components/Base/template/Icons";

import { useProductStore } from "@/store/products";
import { useCategoryStore } from "@/store/categories";
import { apiUrl, xApiKey } from "@/shared/utils";
import Product from "@/types/product";

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const currentPage = ref<number>(1);
const hasMore = ref<boolean>(true);

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

const onScroll = async () => {
  let bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight;

  // Check if the user has scrolled to the bottom of the page and hasMore available
  if (bottomOfWindow && hasMore.value) {
    currentPage.value += 1;
    const res = await fetch(
      `${apiUrl}/api/v1/products?page=${currentPage.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": xApiKey,
        },
      }
    );

    const dataRes: any = await res.json();
    const data: Product[] = dataRes.data;

    // Check if data is not available or if the current page is already the last page, then do not load more content.
    if (!data || dataRes.meta.last_page === currentPage.value) {
      hasMore.value = false;
    }

    // Return an array where the key is the product ID, and the value is the product
    const newProductIds = data.map((product: any) => {
      productStore.items[product.id] = product;
      return product.id;
    });

    // Check if the elements of newProductIds do not exist in the store, then push them
    newProductIds.forEach((item) => {
      if (!productStore.ids.includes(item)) {
        productStore.ids.push(item);
      }
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
});
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
      <button
        type="button"
        class="w-[52px] h-[52px] p-4 rounded-[12px] bg-[#C67C4E] text-center transition duration-300 ease-in-out hover:bg-amber-700"
      >
        <FilterIcon />
      </button>
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
      class="text-center w-[87px] h-[29px] rounded-md px-[8px] py-[4px] text-sm font-semibold leading-[21px] transition duration-300 ease-in-out hover:bg-amber-700 hover:text-[#fff]"
      :class="{
        'text-[#fff] bg-[#C67C4E]': !categoryStore.selectedCategory,
        'bg-[#EDEDED59]/35': categoryStore.selectedCategory,
      }"
    >
      All Coffee
    </button>
    <button
      type="button"
      v-for="category in categoryStore.list"
      @click="setCategorySelected(category.id)"
      class="text-center w-[87px] h-[29px] rounded-md px-[8px] py-[4px] text-sm font-semibold leading-[21px] transition duration-300 ease-in-out hover:bg-amber-700 hover:text-[#fff]"
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
        All products are sold out
      </h1>
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <p
      class="text-center text-xs text-[#313131]/50 font-normal"
      v-if="!hasMore"
    >
      Viewed all products in the list
    </p>
  </div>
  <Nav />
  <Toast />
</template>
