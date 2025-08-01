import { createApp } from "vue";
import App from "@/App.vue";
import "@/assets/less/index.less";
import router from "@/router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import "@/api/mock.js";
import api from "./api/api";

import { useAllDataStore } from "@/stores";

const pinia = createPinia();
const app = createApp(App);
app.config.globalProperties.$api = api;
app.use(pinia);
app.use(ElementPlus);

// 注册图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 持久化：登录状态和动态路由恢复
const store = useAllDataStore();
store.addMenu(router);
app.use(router);
app.mount("#app");
