<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

import CartCardSkeleton from "@/components/CartCardSkeleton.vue";
import Nav from "@/components/Nav.vue";

import { useProductStore } from "@/store/products";
import { useFavoriteStore } from "@/store/favorite";
import { useCartStore } from "@/store/cart";
import { apiUrl, toCurrency, xApiKey } from "@/shared/utils";
import Product from "@/types/product";

const cartStore = useCartStore();
const favoriteStore = useFavoriteStore();
const itemStore = useProductStore();
const router = useRouter();

const currentPage = ref<number>(1);
const hasMore = ref<boolean>(true);

const favorites = computed(() => {
  return favoriteStore.list;
});

const handleAddToCart = (id: string) => {
  cartStore.add(id);

  router.push("/cart");
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
      favoriteStore.items[product.id] = product;
      return product.id;
    });

    // Check if the elements of newProductIds do not exist in the store, then push them
    newProductIds.forEach((item) => {
      if (!favoriteStore.ids.includes(item)) {
        favoriteStore.ids.push(item);
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
  <div class="p-4 pt-[30px] max-w-7xl mb-[80px] mx-auto">
    <h2 class="text-[#242424] text-base font-semibold mb-5">
      Your Wishlist 💖
    </h2>
    <div v-if="!itemStore.loaded" class="space-y-4">
      <CartCardSkeleton v-for="n in 5" :key="n" />
    </div>
    <div v-else-if="!favorites.length">
      <h1 class="text-sm text-[#242424] font-medium">
        There are no products in your wishlist yet
      </h1>
      <p class="text-sm text-[#242424]">
        Add items to your wishlist by clicking on the heart button on each
        product page.
      </p>
      <button
        type="button"
        class="w-full my-4 py-[8px] px-[20px] text-center text-base font-semibold text-[#fff] bg-[#C67C4E] transition duration-300 ease-out hover:bg-[#C67C4E]/80 rounded-[16px]"
        @click="router.push('/')"
      >
        Discover more products
      </button>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="(item, index) in favorites"
        :key="index"
        class="w-full gap-2 overflow-hidden pt-2 px-2 mt-4 border-t border-[#E3E3E3]"
      >
        <router-link :to="`/product/${item.id}`">
          <div class="w-full flex gap-2">
            <img
              :src="`${apiUrl}/storage/${item.images[0].path_name}`"
              :alt="item.title"
              class="min-w-[60px] max-w-[60px] h-[60px] object-cover rounded-xl"
            />

            <div class="flex flex-col justify-between w-full">
              <h2
                class="text-sm text-[#242424] font-semibold leading-4 line-clamp-2 break-words"
              >
                {{ item.title }}
              </h2>
              <div class="flex justify-between items-center gap-2">
                <p class="text-sm font-semibold text-[#C67C4E]">
                  {{ toCurrency(item.price) }}
                </p>
                <div class="w-full flex justify-end items-center gap-1 mt-1">
                  <button
                    type="button"
                    @click.prevent="handleAddToCart(item.id)"
                    class="my-0.5 bg-[#C67C4E] w-[80px] h-[25px] rounded-lg hover:bg-amber-700 focus:outline-none"
                  >
                    <p
                      class="text-center leading-[25px] text-xs text-[#fff] font-medium"
                    >
                      Add to cart
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <p
        class="text-center text-xs text-[#313131]/50 font-normal"
        v-if="!hasMore"
      >
        Viewed all products in the list
      </p>
    </div>
  </div>

  <Nav />
</template>
