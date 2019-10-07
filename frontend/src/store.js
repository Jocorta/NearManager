import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    user: null,
    isUserLogged: false,
    cursoAsist: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLogged = true;
      } else {
        state.isUserLogged = false;
      }
    },
    setUser(state, user) {
      state.user = user;
    },
    getUser() {
      return state.user
    }
    // ,
    // setCursoAsist(state, cursoAsist)
    // {
    //   state.cursoAsist = cursoAsist;
    // },
    // getCursoAsist() {
    //   return state.cursoAsist
    // }
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    }
    // ,
    // setCursoAsist({ commit }, cursoAsist) {
    //   commit("setCursoAsist", cursoAsist);
    // }
  }
});
