import Api from "./Api";

export default {
  getUsers() {
    return Api().get("users");
  },
  addUser(datos) {
    return Api().post("users", datos);
  },
  updateUser(datos) {
    return Api().put("users", datos);
  },
  deleteUser(datos) {
    return Api().delete(`users/${datos}`);
  },
  getUserById(dato) {
    return Api().get(`users/${dato}`);
  }
};
