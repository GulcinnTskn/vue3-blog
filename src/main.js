import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {appAxios} from './utils/appAxios';
import store from './store';

import "@/assets/style.css"
import appHeader from "@/components/Shared/appHeader";
import appBlogList from "@/components/Shared/appBlogList";

import io from "socket.io-client";
const socket = io("http://localhost:2000");

const app = createApp(App)
app.component("appHeader", appHeader)
app.component("appBlogList", appBlogList)
app.use(router)
app.use(store)
app.config.globalProperties.$appAxios = appAxios
app.config.globalProperties.$socket = socket;
app.mount('#app')
