<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

import { ArrowRightIcon } from "@/components/Base/template/Icons";

import { useCartStore } from "@/store/cart";
import { apiUrl, formatDate, toCurrency } from "@/shared/utils";

const router = useRouter();
const cartStore = useCartStore();

const formattedCart = computed(() => cartStore.formattedCart);
</script>

<template>
  <div class="px-4 py-[30px] w-full space-y-4">
    <div class="relative flex items-center gap-1 mb-5">
      <button
        type="button"
        class="items-start absolute left-0 inset-y-0"
        @click="router.push('/history-order')"
      >
        <ArrowRightIcon />
      </button>
      <h2
        class="w-full text-[#242424] text-base text-center font-semibold leading-[19px]"
      >
        Order Detail
      </h2>
    </div>
    <div>
      <h3
        class="flex justify-between items-center gap-1 text-base font-semibold text-[#242424] mt-2"
      >
        <span>Order information</span>
        <span class="text-xs font-normal text-[#C67C4E]"> Done </span>
      </h3>

      <div class="w-full">
        <div class="my-0.5">
          <p class="text-[#A2A2A2] text-xs font-normal break-all mb-0.5">
            Order date: {{ formatDate(new Date(), "YYYY/MM/DD - HH:mm") }}
          </p>
          <p class="text-[#A2A2A2] text-xs font-normal break-all">
            Delivery date: {{ formatDate(new Date(), "YYYY/MM/DD - HH:mm") }}
          </p>
        </div>
        <div
          class="flex justify-between items-center text-sm font-semibold my-0.5"
        >
          <p class="text-[#313131]">Order code</p>
          <p class="text-[#242424]">FHF37FHGJS</p>
        </div>

        <div class="my-0.5">
          <h3 class="text-sm font-semibold text-[#242424] mb-0.5">
            Shipping address
          </h3>
          <div class="text-[#313131] text-xs font-medium break-all mb-0.5">
            <span class="mr-1">Pham Viet Hoang</span>
            <span class="text-xs font-normal">0978354625321</span>
          </div>
          <p class="text-[#A2A2A2] text-xs font-normal break-all mb-0.5">
            So 1 Le Duc Tho, Cau Giay, Hanoi
          </p>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <h3 class="text-base font-semibold text-[#242424] mb-0.5">
        Product has been shipped
      </h3>
      <ul>
        <li
          v-for="product in formattedCart"
          :key="product.id"
          class="w-full flex justify-between items-center gap-2 overflow-hidden pt-2 px-2 mb-[20px] border-t border-[#E3E3E3]"
        >
          <div class="w-full flex gap-2">
            <img
              :src="`${apiUrl}/storage/${product.image}`"
              :alt="product.title"
              class="min-w-[60px] max-w-[60px] h-[60px] object-cover rounded-xl"
            />
            <div class="w-full flex flex-col justify-between">
              <h2
                class="text-sm text-[#242424] font-semibold line-clamp-2 break-words"
              >
                {{ product.title }}
              </h2>
              <div
                class="w-full flex justify-between items-center gap-1"
              >
                <p class="text-xs font-normal text-[#A2A2A2]">x {{ product.quantity }}</p>
                <p class="text-sm font-medium text-[#C67C4E]">{{ toCurrency(product.cost) }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="w-full h-1 bg-[#F9F2ED]"></div>

    <div class="w-full">
      <h3 class="text-base font-semibold text-[#242424] my-2">Total</h3>
      <div>
        <p class="flex justify-between items-center text-sm font-normal mb-0.5">
          <span class="text-[#313131]">Amount</span>
          <span class="text-[#242424]">{{ toCurrency(cartStore.total) }}</span>
        </p>
        <p
          class="flex justify-between items-center text-sm font-semibold mb-0.5"
        >
          <span class="text-[#313131]">Amount paid</span>
          <span class="text-[#242424]">{{ toCurrency(cartStore.total) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
