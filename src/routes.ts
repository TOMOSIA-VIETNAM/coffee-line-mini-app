import { createRouter, createWebHistory } from "vue-router";
import {
  Home,
  Product,
  Cart,
  CheckOut,
  Favorite,
  Success,
  HistoryOrder,
  HistoryOrderDetail,
} from "./pages";

const routes = [
  { path: "/", component: Home },
  { path: "/product/:productId", component: Product },
  { path: "/cart", component: Cart },
  { path: "/checkout", component: CheckOut },
  { path: "/success", component: Success },
  { path: "/favorite", component: Favorite },
  { path: "/history-order", component: HistoryOrder },
  { path: "/history-order/:orderId", component: HistoryOrderDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
