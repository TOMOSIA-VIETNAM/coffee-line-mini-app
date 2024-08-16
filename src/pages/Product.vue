<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import CartCardSkeleton from "@/components/CartCardSkeleton.vue";
import { HeartIcon } from "@/components/Base/template/Icons";

import { useCartStore } from "@/store/cart";
import { useProductStore } from "@/store/products";
import { apiUrl, toCurrency } from "@/shared/utils";
import Product from "@/types/product";
import { useFavoriteStore } from "@/store/favorite";

const cartStore = useCartStore();
const productStore = useProductStore();
const favoriteStore = useFavoriteStore();
const route = useRoute();
const router = useRouter();

const isExpanded = ref(false);
const showIcon = ref(false);
const isLiked = ref(false);

const product = computed<Product>(
  () => productStore.items[route.params.productId as string]
);

const toggleReadMore = () => {
  isExpanded.value = !isExpanded.value;
};

onMounted(() => {
  isLiked.value = favoriteStore.ids.includes(Number(route.params.productId));
});

const toggleLiked = (id: string) => {
  isLiked.value = !isLiked.value;
  const isInclude = favoriteStore.ids.includes(Number(id));
  if (!isInclude) {
    favoriteStore.add(id);
  } else {
    favoriteStore.remove(id);
  }
};

const showSuccess = async (id: string) => {
  cartStore.add(id);
  showIcon.value = true;

  setTimeout(() => {
    showIcon.value = false;
  }, 500);
};
</script>

<template>
  <div class="px-4 pt-[30px] w-screen h-screen">
    <div v-if="!productStore.loaded">
      <CartCardSkeleton />
    </div>
    <div v-else-if="product" class="w-full h-full">
      <Transition name="slide-fade">
        <p v-if="showIcon" class="cart-icon">🛒</p>
      </Transition>
      <figure class="mb-4">
        <div class="carousel rounded-box w-full">
          <div
            v-for="image in product.images"
            :key="image.id"
            class="carousel-item w-full"
          >
            <img
              :src="`${apiUrl}/storage/${image.path_name}`"
              alt="Card Image"
              class="object-cover rounded-[16px] w-full h-[200px]"
            />
          </div>
        </div>
      </figure>
      <div class="w-full">
        <div class="w-full flex justify-between items-start gap-2 mb-2">
          <h2
            class="text-[#242424] text-[20px] font-semibold leading-[30px] break-all"
            v-text="product.title"
          />
          <button
            type="button"
            @click="toggleLiked(product.id)"
          >
            <HeartIcon :color="`${isLiked ? '#C67C4E' : '#2A2A2A'}`" />
          </button>
        </div>
        <div class="flex justify-between items-center gap-2">
          <p class="text-[#A2A2A2] text-xs font-normal">
            {{ product.category.name }}
          </p>
          <div class="flex items-center justify-center gap-3">
            <div
              class="bg-[#EDEDED59]/35 shadow flex justify-center items-center w-[44px] h-[44px] rounded-xl"
            >
              <img
                src="/images/delivery-man.png"
                alt="mini-app-coffee"
                class="w-[28px] h-[28px] object-cover"
              />
            </div>
            <div
              class="bg-[#EDEDED59]/35 shadow flex justify-center items-center w-[44px] h-[44px] rounded-xl"
            >
              <img
                src="/images/coffee.png"
                alt="mini-app-coffee"
                class="w-[20px] h-[20px] object-cover"
              />
            </div>
            <div
              class="bg-[#EDEDED59]/35 shadow flex justify-center items-center w-[44px] h-[44px] rounded-xl"
            >
              <img
                src="/images/package.png"
                alt="mini-app-coffee"
                class="w-[20px] h-[20px] object-cover"
              />
            </div>
          </div>
        </div>
        <div class="w-full my-4 grid place-items-center">
          <div class="w-[95%] h-[1px] bg-[#E3E3E3]"></div>
        </div>

        <h2 class="text-[##242424] text-base font-semibold mb-2">
          Description
        </h2>
        <p
          class="text-[#A2A2A2] text-sm font-light line-clamp-3"
          :class="{ 'line-clamp-none': isExpanded }"
        >
          {{ product.description }}
        </p>
        <button
          type="button"
          @click="toggleReadMore"
          class="text-[#C67C4E] text-sm font-semibold mb-5"
        >
          {{ isExpanded ? "Show less" : "Read more" }}
        </button>
      </div>
      <div
        class="h-[118px] w-full flex justify-between items-center gap-2 bg-[#fff]"
      >
        <div class="w-[150px] h-[56px]">
          <p class="text-sm leading-[16px] font-normal text-[#909090]">Price</p>
          <p
            class="w-full text-[#C67C4E] text-lg font-semibold truncate break-all"
          >
            {{ toCurrency(product.price) }}
          </p>
        </div>
        <button
          class="bg-[#C67C4E] rounded-2xl w-[217px] h-[56px] text-[#fff] text-base font-semibold transition duration-300 ease-linear hover:bg-[#C67C4E]/80"
          @click="showSuccess(product.id)"
          severity="success"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <div v-else>
      <h1 class="text-sm font-medium text-error">
        No product found with id {{ route.params.productId }}
      </h1>
      <button
        type="button"
        class="w-full my-4 py-[8px] px-[20px] text-center text-base font-semibold text-[#fff] bg-[#C67C4E] transition duration-300 ease-out hover:bg-[#C67C4E]/80 rounded-[16px]"
        @click="router.push('/')"
      >
        Back to Home
      </button>
    </div>
  </div>
</template>

<style>
.cart-icon {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
}

.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px) translateY(20px);
  opacity: 0;
}
</style>
