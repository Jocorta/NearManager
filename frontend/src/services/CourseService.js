import Api from "./Api";

export default{
    getCourses() {
        return Api().get("courses");
    },
    getCoursebyId() {
        return Api().get("courses");
    }
};