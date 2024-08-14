<script setup lang="ts">
import { ref } from "vue";

import { FilterIcon } from "@/components/Base/template/Icons";

import { useProductStore } from "@/store/products";
import { apiUrl, toCurrency, xApiKey } from "@/shared/utils";
import Product from "@/types/product";
import { NUMBER_PATERN } from "@/constants/regex";

interface FormFilterField {
  minPrice: number | null;
  maxPrice: number | null;
}

const productStore = useProductStore();

const isShowModal = ref<boolean>(false);
const form = ref<FormFilterField>({
  minPrice: null,
  maxPrice: null,
});
const errors = ref({
  minPrice: "",
  maxPrice: "",
});

const validateForm = () => {
  errors.value = { minPrice: "", maxPrice: "" };
  let isValid = true;

  if (form.value.minPrice && !NUMBER_PATERN.test(String(form.value.minPrice))) {
    errors.value.minPrice = "Min price number must be number";
    isValid = false;
  }

  if (form.value.maxPrice && !NUMBER_PATERN.test(String(form.value.maxPrice))) {
    errors.value.maxPrice = "Max price number must be number";
    isValid = false;
  }

  if (Number(form.value.minPrice) > Number(form.value.maxPrice)) {
    errors.value.minPrice = "Min price must be less than or equal to max price";
    isValid = false;
  }

  return isValid;
};

const resetFilter = async () => {
  form.value = { minPrice: null, maxPrice: null };
  await fetchFilter();
};

const fetchFilter = async () => {
  if (validateForm()) {
    try {
      const res = await fetch(
        `${apiUrl}/api/v1/products?min_price=${
          form.value.minPrice || ""
        }&max_price=${form.value.maxPrice || ""}`,
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
    } finally {
      isShowModal.value = false;
    }
  }
};

const toggleModal = () => {
  isShowModal.value = !isShowModal.value;
};
</script>

<template>
  <button
    type="button"
    @click="toggleModal()"
    class="w-[52px] h-[52px] p-4 rounded-[12px] bg-[#C67C4E] text-center transition duration-300 ease-in-out hover:bg-amber-700"
  >
    <FilterIcon />
  </button>
  <dialog class="modal" :open="isShowModal">
    <div class="modal-box">
      <form method="dialog">
        <button
          @click="toggleModal()"
          class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <form class="my-5">
        <div class="range-slider">
          <div class="mb-5">
            <p class="text-sm font-semibold leading-[21px] mb-2 break-all">
              Min Price: {{ toCurrency(Number(form.minPrice)) }}
            </p>
            <input
              type="number"
              v-model="form.minPrice"
              class="w-full p-2 text-xs border border-gray-300 rounded-[10px] mt-1"
              :class="{ 'border-red-500': errors.minPrice }"
              placeholder="Enter max price"
            />
            <p v-if="errors.minPrice" class="text-red-500 text-xs">
              {{ errors.minPrice }}
            </p>
          </div>

          <div class="mb-5">
            <p class="text-sm font-semibold leading-[21px] mb-2 break-all">
              Max Price: {{ toCurrency(Number(form.maxPrice)) }}
            </p>
            <input
              type="number"
              v-model="form.maxPrice"
              class="w-full p-2 text-xs border border-gray-300 rounded-[10px] mt-1"
              :class="{ 'border-red-500': errors.maxPrice }"
              placeholder="Enter max price"
            />
            <p v-if="errors.maxPrice" class="text-red-500 text-xs">
              {{ errors.maxPrice }}
            </p>
          </div>
        </div>

        <div class="flex justify-between items-center gap-4">
          <button
            type="button"
            @click="resetFilter"
            class="w-full py-2 px-[20px] text-center text-base font-semibold text-[#000] bg-[#ddd] transition duration-300 ease-out hover:bg-[#ddd]/80 rounded-[16px]"
          >
            Reset
          </button>
          <button
            type="button"
            @click="fetchFilter"
            class="w-full py-2 px-[20px] text-center text-base font-semibold text-[#fff] bg-[#C67C4E] transition duration-300 ease-out hover:bg-[#C67C4E]/80 rounded-[16px]"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="toggleModal()">close</button>
    </form>
  </dialog>
</template>

<style>
.range-slider {
  width: 100%;
  margin: 20px auto;
}
</style>
