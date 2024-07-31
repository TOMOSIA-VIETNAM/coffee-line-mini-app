<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { useProductStore } from '@/store/products'
import {apiUrl, toCurrency} from '@/shared/utils'
import CartCardSkeleton from '@/components/CartCardSkeleton.vue'
import Product from "@/types/product";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";

const cartStore = useCartStore()
const productStore = useProductStore()

const route = useRoute()

const product = computed<Product>(
  () => productStore.items[route.params.productId as string],
)
const toast = useToast();

const showSuccess = (id) => {
  cartStore.add(id)
  toast.add({ severity: 'success', summary: 'Success Message', detail: '1 item has been added to the cart.', life: 3000 });
};
</script>

<template>
  <div class="p-4 max-w-4xl mx-auto">
    <div v-if="!productStore.loaded">
      <CartCardSkeleton />
    </div>
    <div v-else-if="product" class="card lg:card-side bordered">
      <figure class="px-10 pt-10">
        <img
          :src="`${apiUrl}/storage/${product.images[0].path_name}`"
          alt="Card Image"
          class="object-contain w-full h-64"
        >
      </figure>
      <div class="card-body">
        <h2 class="card-title" v-text="product.title" />
        <p v-text="product.description" />
        <p class="mt-4 text-lg">
          {{ toCurrency(product.price) }}
        </p>
        <div class="card-actions">
          <button class="btn btn-primary" @click="showSuccess(product.id)" severity="success">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-xl text-error">
        No product found with id {{ route.params.productId }}
      </h1>
    </div>
  </div>
  <Toast/>
</template>

<style>
.p-toast-message {
  width: 100%;
}

@media (max-width: 600px) {
  .p-toast-message {
    width: 300px;
    position: fixed;
    top: 20px;
    right: 10px;
  }
}
</style>
