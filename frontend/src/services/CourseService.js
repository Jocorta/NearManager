import Api from "./Api";

export default{
    getCourses() {
        return Api().get("courses");
    },
    createCourse(datos) {
        return Api().post("courses",datos);
    },
    updateCourse(id,datos) {
        return Api().put("courses",datos,id);
    },
    deleteCourse(datos) {
        return Api().delete("courses",datos);
    }
};