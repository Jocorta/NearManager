<template>
  <div>
    <b-card no-body>
      <!-- <b-card-header header-tag="nav">
        <b-nav card-header tabs>
          <b-nav-item active>Active</b-nav-item>
          <b-nav-item>Inactive</b-nav-item>
          <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
      </b-card-header> -->

      <b-card-body class="text-center">
        <b-card-title>Wellcome to Near Manager!</b-card-title>
        <b-card-sub-title>The following is the create project area for Near-Manager phase 1.</b-card-sub-title>
        <b-card-text>
          
        </b-card-text>
        <b-card-text>
          This is provisional and will have its own module with email confirmation.
        </b-card-text>
        <!-- <b-button id="popover-target-1" variant="primary">Create Project</b-button>
        <b-popover target="popover-target-1" triggers="hover" placement="bottom">
          <template v-slot:title>Just a reminder...</template>
          This will automatically assign you as the project leader! Make sure you are your company's project leader before creating the project.
        </b-popover> -->

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
    lider: localStorage.getItem("user"),
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
      console.log("Aqui les vamos: ")
      console.log(JSON.stringify(this.lider))
      // console.log(this.lider)
      
    },

    async createProject(datos) {
      await ProjectService.addProject(datos);
    },

    // async editarUsuario(datos) {
    //   await UserService.updateUser(datos);
    // },

    // async borrarUsuario(datos) {
    //   await UserService.deleteUser(datos);
    // },

    // editItem(item) {
    //   this.editedIndex = this.usuarios.indexOf(item);
    //   this.editedItem = Object.assign({}, item);
    //   this.dialog = true;
    //   this.$store.dispatch("setPrueba", "hello");
    // },

    // deleteItem(item) {
    //   const index = this.usuarios.indexOf(item);
    //   let conf = confirm("¿Seguro que desea borrar este Usuario?");
    //   if (conf) {
    //     this.borrarUsuario(item._id);
    //     this.usuarios.splice(index, 1);
    //   }
    // },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      // if (this.editedIndex > -1) {
      //   Object.assign(this.usuarios[this.editedIndex], this.editedItem);
      //   this.editarUsuario(this.editedItem);
      // } else {
      //   this.usuarios.push(this.editedItem);
      //   await this.agregarUsuario(this.editedItem);
      //   await this.cargarUsuarios();
      // }
      this.newProject.id_leader = localStorage.getItem("user")
      console.log(this.newProject)
      this.close();
    }
  },
  beforeMount() {
    this.cargarUsuarios();
  },
  computed: {
    formTitle() {
      // return this.editedIndex === -1 ? "Nuevo Usuario" : "Editar Usuario";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>
