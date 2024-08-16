import { onUnmounted } from "vue";

import { useCartStore } from "@/store/cart";
import { CART_STORAGE } from "@/constants";

export function usePersistCart() {
  const cartStore = useCartStore();

  const unsub = cartStore.$subscribe(() => {
    localStorage.setItem(CART_STORAGE, JSON.stringify(cartStore.contents));
  });

  onUnmounted(() => {
    unsub();
  });
}
