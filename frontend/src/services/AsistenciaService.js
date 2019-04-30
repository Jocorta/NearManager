import Api from "./Api";

export default {
  getAsistencias() {
    return Api().get("asistencias");
  }
};
