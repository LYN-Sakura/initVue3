import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";
import { createPinia } from "pinia";
import '@/common/index.scss'

const app = createApp(App);
app.use(router).use(createPinia()).mount("#app");
