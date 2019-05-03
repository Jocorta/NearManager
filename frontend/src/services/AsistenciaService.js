import Api from "./Api";

export default {
  getAsistencias() {
    return Api().get("asistencias");
  },
  addAsistencia(datos) {
    return Api().post("asistencias", datos);
  },
  updateAsistencia(id,datos) {
    return Api().put("asistencias",datos,id);
},
};
