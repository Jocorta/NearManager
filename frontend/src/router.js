import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Asistencia from "./views/Asistencia.vue";
import Curso from "./views/Curso.vue";
import TomaDeAsistencia from "./views/TomaDeAsistencia.vue";
import Registrar from "./views/Registrar.vue";

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
      path: "/tomadeasistencia",
      name: "tomadeasistencia",
      component: TomaDeAsistencia
    },
    {
      path: "/cursos",
      name: "cursos",
      component: Curso
    },
    {
      path: "/registrar",
      name: "registrar",
      component: Registrar
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  let res = await AuthenticateService.authenticate({
    token: localStorage.getItem("token")
  });
  if (to.path !== "/" && !res.data.log && to.path !== "/registrar") {
    next("/");
  } else if (to.path === "/" && res.data.log) {
    if (res.data.tipo === "Administrador") {
      next("/home");
    } else {
      next("/asistencia");
    }
  } else if (
    to.path !== "/asistencia" &&
    res.data.log &&
    res.data.tipo === "Encargado de Curso"
  ) {
    next("/asistencia");
  } else if (
    to.path === "/asistencia" &&
    res.data.log &&
    res.data.tipo === "Administrador"
  ) {
    next("/home");
  }
  next();
});

export default router;
