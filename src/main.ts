import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './routes'
import App from './App.vue'
import liff from '@line/liff';

import './assets/styles/tailwind.css'

liff
    .init({ liffId: '2005903938-1NVll7Zy' })
    .then(() => {
        // if (!liff.isInClient()) {
        //     alert('Please open this application in LINE.');
        //     return;
        // }
        if (!liff.isLoggedIn()) {
            liff.login();
        } else {
            const app = createApp(App);
            app.config.globalProperties.$liff = liff;
            app.use(createPinia())
            app.use(router)
            app.mount('#app')
        }
    })
    .catch((err) => {
        console.error('LIFF Initialization failed', err);
    });
