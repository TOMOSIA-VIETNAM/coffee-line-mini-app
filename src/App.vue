<!-- src/App.vue -->
<template>
  <div id="app">
    <h1>Welcome to Coffee Shop</h1>
    <div v-for="coffee in coffees" :key="coffee.id" class="coffee-item">
      <h2>{{ coffee.name }}</h2>
      <p>{{ coffee.description }}</p>
      <p>Price: {{ coffee.price }}</p>
      <button @click="addToCart(coffee)">Add to Cart</button>
    </div>
    <h2>Cart</h2>
    <ul>
      <li v-for="item in cart" :key="item.id">{{ item.name }} - {{ item.quantity }}</li>
    </ul>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      coffees: [],
      cart: [],
    };
  },
  mounted() {
    // Gọi API để lấy danh sách cà phê
    axios.get('http://tms.localhost:82/api/v1/products', {
      headers: {
        'X-API-KEY': 'aE5f6G7h8I9j0K1l2M3n4O5p6Q7r8S9t0'
      }
    })
      .then(response => {
        this.coffees = response.data;
      })
      .catch(error => {
        console.error('Error fetching coffees:', error);
      });
  },
  methods: {
    addToCart(coffee) {
      const existingItem = this.cart.find(item => item.id === coffee.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...coffee, quantity: 1 });
      }
    },
    checkout() {
      // Xử lý thanh toán
      axios.post('https://your-api-domain.com/api/checkout', { cart: this.cart })
        .then(response => {
          alert('Checkout successful!');
          console.log(response)
          this.cart = [];
        })
        .catch(error => {
          console.error('Error during checkout:', error);
        });
    },
  },
};
</script>

<style>
.coffee-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}
</style>
