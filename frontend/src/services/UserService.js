import Api from "./Api";

export default {
  getUsers() {
    return Api().get("users");
  },
  getUserById(dato){
    return Api().get("users", dato)
  }
};
