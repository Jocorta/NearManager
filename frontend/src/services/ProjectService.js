import Api from "./Api";

export default {
  getProject() {
    return Api().get("projects");
  },
  addProject(datos) {
    return Api().post("projects", datos);
  },
  updateProject(datos) {
    return Api().put("projects", datos);
  },
  deleteProject(datos) {
    return Api().delete(`projects/${datos}`);
  },
  geProjectById(dato) {
    return Api().get(`projects/${dato}`);
  }
};
