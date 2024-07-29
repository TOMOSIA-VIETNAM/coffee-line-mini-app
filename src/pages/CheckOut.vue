<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Checkout Information</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold">Name<span class="text-red-700">*</span></label>
        <input
            type="text"
            v-model="form.client_name"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            :class="{'border-red-500': errors.client_name}"
            placeholder="Enter your name"
        />
        <p v-if="errors.client_name" class="text-red-500 text-sm">{{ errors.client_name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold">Address<span class="text-red-700">*</span></label>
        <input
            type="text"
            v-model="form.address"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            :class="{'border-red-500': errors.address}"
            placeholder="Enter your address"
        />
        <p v-if="errors.address" class="text-red-500 text-sm">{{ errors.address }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold">Phone Number <span class="text-red-700">*</span></label>
        <input
            type="text"
            v-model="form.phone_number"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            :class="{'border-red-500': errors.phone_number}"
            placeholder="Enter your phone number"
        />
        <p v-if="errors.phone_number" class="text-red-500 text-sm">{{ errors.phone_number }}</p>
      </div>
      <div class="mb-4">
        <ul>
          <li v-for="product in formattedCart" :key="product.id" class="flex items-center mb-4">
            <img :src="`${apiUrl}/storage/${product.image}`" :alt="product.title" class="w-16 h-16 rounded mr-4" />
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="font-medium">{{ product.title }}</span>
                <span>X {{ product.quantity }}</span>
                <span>{{ toCurrency(product.cost)}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <button type="submit" class="w-full p-2 bg-blue-500 text-white rounded" @click="handleSubmit">Checkout</button>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useCartStore} from "@/store/cart";
import {apiUrl, toCurrency, xApiKey} from "@/shared/utils";
import {useRouter} from "vue-router";
import liff from "@line/liff";
import axios from "axios";

const cartStore = useCartStore()
const formattedCart = computed(() => cartStore.formattedCart)
const cart = computed(() => cartStore.cartContent)
const route = useRouter()
const lineId = ref<string|null>(null);

const form = ref({
  client_name: '',
  address: '',
  phone_number: '',
  shop_id: 1,
  line_id: lineId,
  total_price: cartStore.total,
  items: cart.value
})

const errors = ref({
  client_name: '',
  address: '',
  phone_number: ''
})

onMounted(async ()=>{
  const userProfile = await liff.getProfile();
  lineId.value = userProfile.userId;
})

const validateForm = () => {
  errors.value = { client_name: '', address: '', phone_number: '' }

  let isValid = true

  if (!form.value.client_name) {
    errors.value.client_name = 'Name is required'
    isValid = false
  }

  if (!form.value.address) {
    errors.value.address = 'Address is required'
    isValid = false
  }

  if (!form.value.phone_number) {
    errors.value.phone_number = 'Phone is required'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (validateForm()) {
    const res = await axios.post(`${apiUrl}/api/v1/orders`, form.value, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': xApiKey,
      }
    })
    if (res && res.status === 200){
      await route.push('/')
      cartStore.deleteAll()
    }
  }
}
</script>

