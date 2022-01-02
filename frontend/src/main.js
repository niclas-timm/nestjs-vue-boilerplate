import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

// Set default base url for axios.
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.withCredentials = true;
// axios.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return config;
//   },
// );

createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app');
