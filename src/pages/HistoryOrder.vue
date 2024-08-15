<script setup lang="ts">
import { computed, ref } from "vue";

import Nav from "@/components/Nav.vue";

import { useCartStore } from "@/store/cart";
import { apiUrl, formatDate, toCurrency } from "@/shared/utils";
import { STATUS_ORDER } from "@/constants";

const cartStore = useCartStore();

const formattedCart = computed(() => cartStore.formattedCart);
const statusSeleted = ref<number>(STATUS_ORDER.INTRASIT);
const statusOrderList = ref([
  {
    title: "In transit",
    value: STATUS_ORDER.INTRASIT,
  },
  {
    title: "Delivered",
    value: STATUS_ORDER.DELIVERED,
  },
  {
    title: "Canceled",
    value: STATUS_ORDER.CANCELLED,
  },
]);

const setStatusSelected = (value: number) => {
  statusSeleted.value = value;
};
</script>

<template>
  <div class="p-4 pt-[30px] mb-[80px] w-full">
    <h2 class="text-[#242424] text-base font-semibold mb-5">
      Your purchase history
    </h2>
    <div
      class="w-full flex whitespace-nowrap no-scrollbar overflow-x-auto justify-start items-center gap-4"
    >
      <button
        type="button"
        v-for="status in statusOrderList"
        :key="status.value"
        @click="setStatusSelected(status.value)"
        class="text-center w-fit h-[29px] rounded-md px-[8px] py-[4px] text-sm font-semibold leading-[21px] transition duration-300 ease-in-out hover:bg-amber-700 hover:text-[#fff]"
        :class="{
          'text-[#fff] bg-[#C67C4E]': statusSeleted === status.value,
          'text-[#000] bg-[#EDEDED59]/35': statusSeleted !== status.value,
        }"
      >
        {{ status.title }}
      </button>
    </div>
    <div class="pb-4">
      <p
        class="text-sm text-[#242424] font-medium mt-4"
        v-if="cartStore.count <= 0"
      >
        No orders available
      </p>
      <ul>
        <li
          v-for="product in formattedCart"
          :key="product.id"
          class="w-full gap-2 overflow-hidden pt-2 px-2 mt-4 border-t border-[#E3E3E3]"
        >
          <router-link :to="`/history-order/${product.id}`">
            <div class="w-full flex gap-2">
              <img
                :src="`${apiUrl}/storage/${product.image}`"
                :alt="product.title"
                class="min-w-[60px] max-w-[60px] h-[60px] object-cover rounded-xl"
              />

              <div class="flex flex-col justify-between w-full">
                <h2
                  class="text-sm text-[#242424] font-semibold line-clamp-2 break-words"
                >
                  {{ product.title }}
                </h2>
                <div class="flex justify-between gap-2">
                  <p class="text-xs font-normal text-[#2A2A2A]">
                    {{ formatDate(new Date(), "YYYY/MM/DD - HH:mm") }}
                  </p>
                </div>
              </div>
            </div>

            <div class="w-full flex justify-between items-center gap-1 mt-1">
              <p class="text-sm font-medium leading-[21px] break-all">
                <span>Total amount ({{ product.quantity }} item):</span>
                <span class="text-[#C67C4E] font-semibold">{{
                  toCurrency(product.cost)
                }}</span>
              </p>
              <router-link
                :to="`/history-order/${product.id}`"
                class="my-0.5 bg-[#C67C4E] w-[80px] h-[30px] rounded-lg hover:bg-amber-700 focus:outline-none"
              >
                <p
                  class="text-center leading-[30px] text-xs text-[#fff] font-medium"
                >
                  View detail
                </p>
              </router-link>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>

  <Nav />
</template>
