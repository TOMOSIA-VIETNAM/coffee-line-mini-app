// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import liff from '@line/liff';

liff
    .init({ liffId: '2005903938-J4nNNVWK' })
    .then(() => {
        const app = createApp(App);
        app.mount('#app');
    })
    .catch((err) => {
        console.error('LIFF Initialization failed', err);
    });
