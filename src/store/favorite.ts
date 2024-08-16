import { defineStore } from "pinia";

import { apiUrl, xApiKey } from "@/shared/utils";
import Product from "@/types/product";

interface FavoriteProductState {
  items: Record<string, Product>;
  ids: number[];
}

export const useFavoriteStore = defineStore({
  id: "favorite",

  state: (): FavoriteProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },

    loaded(): boolean {
      return this.ids.length > 0;
    },
  },

  actions: {
    async fetchAll() {
      if (this.loaded) return;

      const res = await fetch(`${apiUrl}/api/v1/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": xApiKey,
        },
      });

      const dataRes: any = await res.json();
      const data: Product[] = dataRes.data;
      this.ids = data.map((product: any) => {
        this.items[product.id] = product;
        return product.id;
      });
    },

    add(id: string) {
      // Add logic to add a product to favorite
    },

    remove(id: string) {
      // Add logic to remove a product from favorite
    },

    clear() {
      this.items = {};
      this.ids = [];
    },
  },
});
