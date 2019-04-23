import Api from "./Api";

export default {
  login(datos) {
    return Api().post("login", datos);
  }
};
