import Api from "./Api";

export default {
  authenticate(datos) {
    //console.log("hello");
    return Api().get("authenticate", datos);
  }
};
