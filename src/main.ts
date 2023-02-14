import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";

import "tailwindcss/src/css/preflight.css";
import "./assets/main.css";

const app = createApp(App);

app.use(
  createRouter({
    history: createWebHashHistory(),
    routes: [],
  })
);

app.mount("#app");
