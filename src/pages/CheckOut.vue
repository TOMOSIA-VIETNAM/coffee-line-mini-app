<template>
  <div class="px-4 pt-[30px] w-screen h-screen">
    <div class="w-full h-full pb-[118px] space-y-4">
      <div class="mb-5">
        <h2
          class="text-[#242424] text-base text-center font-semibold leading-[19px]"
        >
          Detail
        </h2>
      </div>
      <div>
        <h3 class="text-base font-semibold text-[#242424] my-3">
          Delivery Address
        </h3>

        <div class="w-full">
          <p
            v-if="form.client_name"
            class="text-[#313131] text-sm font-semibold break-all mb-1"
          >
            Name: {{ form.client_name }}
          </p>
          <p
            v-if="form.address"
            class="text-[#A2A2A2] text-xs font-normal break-all"
          >
            Address: {{ form.address }}
          </p>
          <p
            v-if="form.phone_number"
            class="text-[#A2A2A2] text-xs font-normal break-all"
          >
            Phone number: {{ form.phone_number }}
          </p>
        </div>

        <div class="my-4">
          <div class="mb-4">
            <label class="block text-sm text-gray-700 font-bold"
              >Name<span class="text-red-700">*</span></label
            >
            <input
              type="text"
              v-model="form.client_name"
              class="w-full p-2 text-xs border border-gray-300 rounded-[10px] mt-1"
              :class="{ 'border-red-500': errors.client_name }"
              placeholder="Enter your name"
            />
            <p v-if="errors.client_name" class="text-red-500 text-xs">
              {{ errors.client_name }}
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-sm text-gray-700 font-bold"
              >Address<span class="text-red-700">*</span></label
            >
            <input
              type="text"
              v-model="form.address"
              class="w-full p-2 text-xs border border-gray-300 rounded-[10px] mt-1"
              :class="{ 'border-red-500': errors.address }"
              placeholder="Enter your address"
            />
            <p v-if="errors.address" class="text-red-500 text-xs">
              {{ errors.address }}
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-sm text-gray-700 font-bold"
              >Phone Number <span class="text-red-700">*</span></label
            >
            <input
              type="text"
              v-model="form.phone_number"
              class="w-full p-2 text-xs border border-gray-300 rounded-[10px] mt-1"
              :class="{ 'border-red-500': errors.phone_number }"
              placeholder="Enter your phone number"
            />
            <p v-if="errors.phone_number" class="text-red-500 text-xs">
              {{ errors.phone_number }}
            </p>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <ul>
          <li
            v-for="product in formattedCart"
            :key="product.id"
            class="w-full flex justify-between items-center gap-2 overflow-hidden pt-4 px-2 mt-[20px] border-t border-[#E3E3E3]"
          >
            <div class="w-[70%] flex gap-2">
              <img
                :src="`${apiUrl}/storage/${product.image}`"
                :alt="product.title"
                class="w-[60px] h-[60px] object-cover rounded-xl"
              />
              <div class="w-[70%]">
                <h2
                  class="text-sm text-[#242424] font-semibold mb-2 line-clamp-2 break-words"
                >
                  {{ product.title }}
                </h2>
                <p class="text-xs font-normal text-[#C67C4E]">
                  {{ toCurrency(product.cost) }}
                </p>
              </div>
            </div>
            <div class="grid grid-cols-3 items-center gap-2">
              <button
                class="flex justify-center items-center border border-[#F9F2ED] w-6 h-6 bg-[#fff] rounded-full hover:bg-[#F9F2ED] p-1"
                @click="cartStore.remove(product.id)"
              >
                <MinusIcon />
              </button>
              <span
                class="text-sm text-[#2A2A2A] font-semibold text-center leading-[21px]"
                >{{ product.quantity }}</span
              >
              <button
                class="flex justify-center items-center border border-[#F9F2ED] w-6 h-6 bg-[#fff] rounded-full hover:bg-[#F9F2ED] p-1"
                @click="cartStore.add(product.id)"
              >
                <PlusIcon />
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="w-full h-1 bg-[#F9F2ED]"></div>

      <!-- Discount badge -->
      <!-- <div
        class="w-full flex justify-between items-center h-[56px] bg-[#fff] p-[16px] border border-[#EDEDED] rounded-[16px]"
      >
        <div class="flex items-center gap-4">
          <DiscountIcon />
          <p class="text-sm font-semibold text-[#313131]">
            1 Discount is Applies
          </p>
        </div>
        <ArrowLeftIcon />
      </div> -->

      <div class="w-full">
        <h3 class="text-base font-semibold text-[#242424] my-4">
          Payment Summary
        </h3>
        <div>
          <p class="flex justify-between items-center">
            <span class="text-sm font-normal text-[#313131]">Price</span>
            <span class="text-[#242424] text-sm font-semibold">{{
              toCurrency(cartStore.total)
            }}</span>
          </p>
          <!-- Delivery Fee -->
          <!-- <div class="flex justify-between items-center">
            <p class="text-sm font-normal text-[#313131]">Delivery Fee</p>

            <p class="flex gap-1">
              <del class="text-[#242424] text-sm font-normal">{{
                toCurrency(2.0)
              }}</del>
              <span class="text-[#242424] text-sm font-semibold">{{
                toCurrency(1.0)
              }}</span>
            </p>
          </div> -->
        </div>
      </div>

      <div class="sticky bottom-0 h-[130px] w-full bg-[#fff]">
        <div class="w-full h-[56px] flex justify-between items-center">
          <div class="flex items-center gap-4">
            <WalletIcon />
            <div>
              <p
                class="text-sm leading-[16px] font-semibold text-[#242424] mb-2"
              >
                Cash/Wallet
              </p>
              <p
                class="text-[#C67C4E] text-xs font-semibold leading-[18px] truncate break-all"
              >
                {{ toCurrency(cartStore.total) }}
              </p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="w-full py-[16px] px-[20px] text-center text-base font-semibold text-[#fff] bg-[#C67C4E] transition duration-300 ease-out hover:bg-[#C67C4E]/80 rounded-[16px]"
          @click="handleSubmit"
        >
          {{ isSubmitting ? "Loading..." : "Checkout" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import liff from "@line/liff";

import {
  ArrowRightIcon,
  WalletIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/Base/template/Icons";

import { useCartStore } from "@/store/cart";
import { apiUrl, toCurrency, xApiKey } from "@/shared/utils";

const route = useRouter();
const cartStore = useCartStore();

const lineId = ref<string | null>(null);
const isSubmitting = ref<boolean>(false);

const formattedCart = computed(() => cartStore.formattedCart);
const cart = computed(() => cartStore.cartContent);
const totalOrder = computed(() =>
  formattedCart.value.reduce((acc, item) => {
    return acc + item.cost;
  }, 0)
);

const form = ref({
  client_name: "",
  address: "",
  phone_number: "",
  shop_id: 1,
  line_id: lineId,
  total_price: totalOrder,
  items: cart,
});

const errors = ref({
  client_name: "",
  address: "",
  phone_number: "",
});

onMounted(async () => {
  const userProfile = await liff.getProfile();
  lineId.value = userProfile.userId;
});

const validateForm = () => {
  errors.value = { client_name: "", address: "", phone_number: "" };

  let isValid = true;

  if (!form.value.client_name) {
    errors.value.client_name = "Name is required";
    isValid = false;
  }

  if (!form.value.address) {
    errors.value.address = "Address is required";
    isValid = false;
  }

  if (!form.value.phone_number) {
    errors.value.phone_number = "Phone number is required";
    isValid = false;
  } else if (!/^\d+$/.test(form.value.phone_number)) {
    errors.value.phone_number = "Phone number must be number";
    isValid = false;
  } else if (form.value.phone_number.length !== 10) {
    errors.value.phone_number =
      "Phone number must be exactly 10 characters long";
    isValid = false;
  }
  return isValid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    isSubmitting.value = true;
    try {
      const res = await axios.post(`${apiUrl}/api/v1/orders`, form.value, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": xApiKey,
        },
      });
      if (res && res.status === 200) {
        await route.push("/success");
        cartStore.deleteAll();
      }
    } catch (error) {
      console.log(error);
    } finally {
      isSubmitting.value = false;
    }
  }
};
</script>
