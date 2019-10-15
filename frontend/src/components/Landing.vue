<template>
  <div>
    <b-card no-body>
      <b-card-body class="text-center">
        <b-card-title>Wellcome to Near Manager!</b-card-title>
        <b-card-sub-title>The following is the create project area for Near-Manager phase 1.</b-card-sub-title>
        <b-card-text>
          
        </b-card-text>
        <b-card-text>
          This is provisional and will have its own module with email confirmation.
        </b-card-text>
<!-- TEST AREA -->
        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <b-button id="popover-target-1" variant="primary" v-on="on">Create Project</b-button>
              <b-popover target="popover-target-1" triggers="hover" placement="bottom">
                <template v-slot:title>Just a reminder...</template>
                This will automatically assign you as the project leader! Make sure you are your company's project leader before creating the project.
              </b-popover>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Create Project</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>

                    <v-col cols="12" sm="6" md="4">
                      <v-text-field label="Project Name*" v-model="newProject.name" required hint="Make sure it's a name everyone in your team can easily recognize."></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        :items="this.nombres"
                        v-model="newProject.members"
                        label="Users"
                        multiple
                        required
                      ></v-autocomplete>
                    </v-col>

                  </v-row>
                </v-container>
                <small>*: indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close()">Close</v-btn>
                <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>

<!-- END TEST AREA -->



      </b-card-body>
    </b-card>
  </div>
</template>





<script>
import UserService from "@/services/UserService";
import ProjectService from "@/services/ProjectService";
import VueJwtDecode from 'vue-jwt-decode'
export default {
  name: "Project",
  data: () => ({
    dialog: false,
    search: "",
    usuarios: [],
    nombres: [],
    pagination: {},

    newProject: {
      name: "",
      id_leader: [],
      members: [],
      files: []
    },
    token: localStorage.getItem("token"),
    lider: "",
    selected: {
      name: "",
      id_lider: ""
    }
  }),
  methods: {
    async cargarUsuarios() {
      let response = await UserService.getUsers();
      this.usuarios = response.data;
      this.usuarios.forEach(usuario => {
        this.nombres.push(usuario.name)
      });
    },
    async obtainUserId() {
      let tk = VueJwtDecode.decode(this.token)
      this.lider = tk["id"]
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    async createProject(datos) {
      await ProjectService.addProject(datos);
    },
    async save() {
      this.newProject.id_leader = this.lider
      var newArray = []
      this.usuarios.forEach(usuario => {
        this.newProject.members.forEach(member => {
          if (usuario.name == member) {
            newArray.push(usuario._id)
          }
        })
      })
      this.newProject.members = newArray
      console.log(this.newProject.members)
      await this.createProject(this.newProject);
      confirm("Project Created.");
      this.close();
      this.$router.push("/");
    }
  },
  beforeMount() {
    this.cargarUsuarios();
    this.obtainUserId();
  },
  computed: {
    formTitle() {
      
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>
