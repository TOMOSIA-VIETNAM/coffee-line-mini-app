<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import CartCardSkeleton from "@/components/CartCardSkeleton.vue";
import { ArrowRightIcon, HeartIcon } from "@/components/Base/template/Icons";

import { useCartStore } from "@/store/cart";
import { useProductStore } from "@/store/products";
import { apiUrl, toCurrency } from "@/shared/utils";
import Product from "@/types/product";

const cartStore = useCartStore();
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

const isExpanded = ref(false);
const showIcon = ref(false);

const product = computed<Product>(
  () => productStore.items[route.params.productId as string]
);

const toggleReadMore = () => {
  isExpanded.value = !isExpanded.value;
};

const showSuccess = async (id: string) => {
  cartStore.add(id);
  showIcon.value = true;

  setTimeout(() => {
    showIcon.value = false;
  }, 1000);
};
</script>

<template>
  <div class="px-8 pt-[30px] w-screen h-screen">
    <div v-if="!productStore.loaded">
      <CartCardSkeleton />
    </div>
    <div v-else-if="product" class="w-full h-full pb-[118px]">
      <Transition name="slide-fade" class="cart-icon">
        <p v-if="showIcon">🛒</p>
      </Transition>
      <div class="flex justify-between items-center gap-1 mb-5">
        <button type="button" @click="router.back()">
          <ArrowRightIcon />
        </button>
        <h2 class="text-[#242424] text-base font-semibold leading-[19px]">
          Detail
        </h2>
        <HeartIcon color="#2A2A2A" />
      </div>
      <figure class="my-4">
        <img
          :src="`${apiUrl}/storage/${product.images[0].path_name}`"
          alt="Card Image"
          class="object-cover rounded-[16px] w-full h-[200px]"
        />
      </figure>
      <div class="w-full">
        <h2
          class="text-[#242424] text-[20px] font-semibold leading-[30px] line-clamp-2 break-all"
          v-text="product.title"
        />
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
      <h1 class="text-xl text-error">
        No product found with id {{ route.params.productId }}
      </h1>
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
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px) translateY(20px);
  opacity: 0;
}
</style>
