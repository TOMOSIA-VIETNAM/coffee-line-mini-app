<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Checkout Information</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold">Client Name<span class="text-red-700">*</span></label>
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
            v-model="form.phone"
            class="w-full p-2 border border-gray-300 rounded mt-1"
            :class="{'border-red-500': errors.phone}"
            placeholder="Enter your phone number"
        />
        <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>
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

<script setup>
import {computed, ref} from 'vue'
import {useCartStore} from "@/store/cart";
import {apiUrl, toCurrency} from "@/shared/utils";

const cartStore = useCartStore()
const formattedCart = computed(() => cartStore.formattedCart)

const form = ref({
  client_name: '',
  address: '',
  phone: ''
})

const errors = ref({
  client_name: '',
  address: '',
  phone: ''
})
const validateForm = () => {
  errors.value = { client_name: '', address: '', phone: '' }

  let isValid = true

  if (!form.value.client_name) {
    errors.value.client_name = 'Name is required'
    isValid = false
  }

  if (!form.value.address) {
    errors.value.address = 'Address is required'
    isValid = false
  }

  if (!form.value.phone) {
    errors.value.phone = 'Phone is required'
    isValid = false
  }

  return isValid
}
const handleSubmit = () => {
  if (validateForm()) {
    console.log('Checkout Information:', form.value)
  }
}
</script>

