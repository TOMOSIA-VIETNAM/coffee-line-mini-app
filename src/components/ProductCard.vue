<script setup lang="ts">
import { useCartStore } from '@/store/cart'
import {apiUrl, toCurrency} from '@/shared/utils'
import Product from "@/types/product";

defineProps<{
  product: Product
}>()
import { useToast } from "primevue/usetoast";
const toast = useToast();

const showSuccess = (id: any) => {
  cartStore.add(id)
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Add Success', life: 3000 });
};
const cartStore = useCartStore()
</script>

<template>
  <div class="card bordered ">
    <figure class="px-8 pt-10" style="height: 379px !important;">
      <img
        :src="`${apiUrl}/storage/${product.images[0].path_name}`"
        alt="Card Image"
        class="object-contain w-full h-64"
        style="width: 100%;height: 100%;object-fit: cover !important;"
      >
    </figure>
    <div class="card-body">
      <h2 class="card-title">
        <router-link class="link link-hover" :to="`/product/${product.id}`">
          {{ product.title }}
        </router-link>
      </h2>
      <p>{{ toCurrency(product.price) }}</p>
      <div class="justify-end card-actions">
        <button class="btn btn-primary" @click="showSuccess(product.id)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>
