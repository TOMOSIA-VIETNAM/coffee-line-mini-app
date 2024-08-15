<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useDebounceFn } from "@vueuse/core";

import { useProductStore } from "@/store/products";
import { apiUrl, xApiKey } from "@/shared/utils";
import Product from "@/types/product";

const productStore = useProductStore();
const router = useRouter();
const input = ref("");

const searchResults = computed(() => {
  if (!input.value || input.value.length < 2) return [];

  return productStore.list.filter((item) => {
    return item.title.toLowerCase().includes(input.value.toLowerCase());
  });
});

const onInput = useDebounceFn(async () => {
  try {
    const res = await fetch(
      `${apiUrl}/api/v1/products?title=${input.value || ""}`,
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
    productStore.ids = data.map((product: any) => {
      productStore.items[product.id] = product;
      return product.id;
    });
  } catch (error) {
    console.log(error);
  }
}, 500);

function navigate(id: string) {
  input.value = "";
  router.push(`/product/${id}`);
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <div class="form-control">
      <input
        v-model="input"
        type="text"
        @input="onInput"
        placeholder="Search..."
        class="input input-ghost"
      />
    </div>
    <ul
      v-if="searchResults.length"
      class="z-50 shadow menu dropdown-content bg-base-100 rounded-box w-64 text-base-content overflow-y-scroll"
      style="max-height: 50vh"
    >
      <li v-for="product in searchResults" :key="product.id">
        <a
          href="#"
          @click.prevent="navigate(product.id)"
          v-text="product.title"
          class="hover:bg-[#ddd]"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.input-ghost {
  width: 100%;
}
</style>
