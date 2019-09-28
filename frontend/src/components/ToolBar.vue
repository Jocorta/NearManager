<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app class="indigo" dark>
      <v-list dense>
        <v-list-tile @click="irHome">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

          <v-list-tile @click="irHome" v-for="(project, index) in projects" :key="index">
            <v-list-tile-action>
              <v-icon>list</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ project }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>


        <!-- <template v-if="admin">
          <v-list-tile @click="irCursos">
            <v-list-tile-action>
              <v-icon>library_books</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Cursos</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template> -->
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Near Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="salir">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import AuthenticateService from "@/services/AuthenticateService";
import ProjectService from "@/services/ProjectService"
export default {
  name: "ToolBar",
  data: () => ({
    drawer: null,
    admin: true,
    label: "",
    projects: []
  }),
  methods: {
    salir() {
      localStorage.clear();
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/");
    },
    // irCursos() {
    //   this.$router.push("cursos");
    // },
    // async checarTipo() {
    //   let res = await AuthenticateService.authenticate({
    //     token: localStorage.getItem("token")
    //   });
    //   if (res.data.tipo === "Administrador") {
    //     this.admin = true;
    //     this.label = "Administrar Usuarios";
    //   } else {
    //     this.admin = false;
    //     this.label = "Asistencia";
    //   }
    // },
    async irHome() {
      let res = await AuthenticateService.authenticate({
        token: localStorage.getItem("token")
      });
        this.$router.push("home");
    },
    async getProjects() {
      let response = await ProjectService.getProject();
      this.projects = response.data;
    },
    async goProject(id) {
      let res = await AuthenticateService.authenticate({
        token: localStorage.getItem("token")
      });
        this.$router.push("project");
    }
  },
  beforeMount() {
    this.getProjects()
  }
};
</script>
