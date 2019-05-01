import Api from "./Api";

export default {
  getAsistencias() {
    return Api().get("asistencias");
  },
  addAsistencia(datos) {
    return Api().post("asistencias", datos);
  }
};
