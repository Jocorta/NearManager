import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Asistencia from "./views/Asistencia.vue";
import Curso from "./views/Curso.vue";

import store from "./store";
import LoginService from "@/services/AuthenticateService";
import AuthenticateService from "./services/AuthenticateService";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/asistencia",
      name: "asistencia",
      component: Asistencia
    },
    {
      path: "/cursos",
      name: "cursos",
      component: Curso
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  let res = await AuthenticateService.authenticate({
    token: localStorage.getItem("token")
  });
  if (to.path !== "/" && !res.data) {
    next("/");
  } else if (to.path === "/" && res.data) {
    next("/home");
  }
  next();
});

export default router;
