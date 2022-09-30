import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";
import { createNProgress } from "./guard/nprogress";

/** 动态引入 module 文件下的 子路由 */
// const doc = import.meta.globEager("./module/*.ts");
// const childrenRouter: RouteRecordRaw[] = [];
// Object.values(doc).forEach((item: any) => {
//   item.default.forEach((val: RouteRecordRaw) => {
//     childrenRouter.push(val);
//   });
// });

const router: Router = createRouter({
  //history模式使用HTML5模式
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/pages/home.vue"),
    },
  ],
});

createNProgress(router);
export default router;
