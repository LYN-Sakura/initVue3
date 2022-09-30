import type { Router } from "vue-router";
import "nprogress/nprogress.css";
import NProgress from "nprogress";

export function createNProgress(router: Router) {
  router.beforeEach(async (to) => {
    NProgress.start();
    return true;
  });

  router.afterEach(async (to) => {
    NProgress.done();
    return true;
  });
}
