import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import App from './App.vue'
import liff from '@line/liff';
import ToastService from 'primevue/toastservice';
import './assets/styles/tailwind.css'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

liff
    .init({ liffId: import.meta.env.VITE_LIFF_ID })
    .then(() => {
        const app = createApp(App);
        app.config.globalProperties.$liff = liff;
        app.use(createPinia())
        app.use(PrimeVue);
        app.use(ToastService);
        app.use(router)
        app.mount('#app')
        // if (!liff.isInClient()) {
        //     alert('Please open this application in LINE.');
        //     return;
        // }
        // if (!liff.isLoggedIn()) {
        //     liff.login();
        // } else {
        //     const app = createApp(App);
        //     app.config.globalProperties.$liff = liff;
        //     app.use(createPinia())
        //     app.use(router)
        //     app.mount('#app')
        // }
    })
    .catch((err) => {
        console.error('LIFF Initialization failed', err);
    });
