import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Asistencia from "./views/Asistencia.vue";

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
    }
  ]
});

const token = store.state.token;

router.beforeEach(async (to, from, next) => {
  //let response = await AuthenticateService.authenticate(token);
  //console.log(response);
  if (to.path !== "/" && !store.state.token) {
    next("/");
  }
  next();
});

export default router;
