import { createRouter, createWebHashHistory } from "vue-router";
import { getToken } from "@/utils";

const routes = [
  {
    path: "/",
    name: "main",
    component: () => import("@/views/Main.vue"),
    redirect: "/home",
    children: [], // 动态 children
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/404",
    name: "error404",
    component: () => import("@/views/Error404.vue"),
  },
  // ✅ 通配符路由，必须放在最后
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = getToken();

  if (to.path === "/login") return next();
  if (!token) return next("/login");

  next();
});

export default router;
