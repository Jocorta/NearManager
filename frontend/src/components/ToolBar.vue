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

          <v-list-tile v-for="(project, index) in displayProjects" :key="index">


              <v-list-tile-action @click="goProject(project._id)">
                <v-icon>list</v-icon>
              </v-list-tile-action>
              <v-list-tile-content @click="goProject(project._id)">
                <v-list-tile-title>{{ project.name }}</v-list-tile-title>
              </v-list-tile-content>

            
          </v-list-tile>
        
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Near Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="notifications" color="orange" fab x-large dark>
          <v-icon>event</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn flat @click="salir">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import AuthenticateService from "@/services/AuthenticateService";
import ProjectService from "@/services/ProjectService"
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: "ToolBar",
  data: () => ({
    drawer: null,
    token: localStorage.getItem("token"),
    user: "",
    admin: true,
    label: "",
    projects: [],
    displayProjects: []
  }),
  methods: {
    salir() {
      localStorage.clear();
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push("/");
    },
    async irHome() {
      let res = await AuthenticateService.authenticate({
        token: localStorage.getItem("token")
      });
        this.$router.push("/home");
    },
    async goProject() {
      let res = await AuthenticateService.authenticate({
        token: localStorage.getItem("token")
      });
        this.$router.push("project");
    },
    async obtainUserId() {
      let tk = VueJwtDecode.decode(this.token)
      this.user = tk["id"]
    },
    async notifications() {
      console.log("Im notifications")
    },
    async getProjects() {
      let response = await ProjectService.getProject();
      this.projects = response.data;
      this.projects.forEach(element => {
        if(element.members.includes(this.user)) {
          this.displayProjects.push(element)
        }
    });
    },
    async goProject(id) {
      let res = await AuthenticateService.authenticate({
        token: localStorage.getItem("token")
      });
        this.$router.push("/project/" + id);
    }
  },
  beforeMount() {
    this.getProjects()
    this.obtainUserId()
    
    
  }
};
</script>
