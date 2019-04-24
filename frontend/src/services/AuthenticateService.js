import Api from "./Api";

export default {
  authenticate(datos) {
    return Api().post("authenticate", datos);
  }
};
