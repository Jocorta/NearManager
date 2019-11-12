<template>
  <div>
    <v-card flat>
      <!-- <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
      </v-card-title> -->
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ currentProject.name }}</v-toolbar-title>

        <v-row justify="center">
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <b-button id="popover-target-1" variant="primary" v-on="on">Change Leader</b-button>
              <b-popover target="popover-target-1" triggers="hover" placement="bottom">
                <template v-slot:title>Just a reminder...</template>
                This is a provisional button for the settings section to add the functionality of changing a leader of a project. This is supporten only for phase 1 of Near-Manager.
              </b-popover>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Change Leader</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>

                    <v-col cols="12" sm="6">
                      <v-autocomplete
                        :items="this.usuarios"
                        v-model="leader.new"
                        label="Users"
                        required
                        item-text="name"
                        return-object
                      ></v-autocomplete>
                    </v-col>

                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close()">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>


      </v-toolbar>

      
      <!-- <v-data-table :headers="headers" :items="usuarios" :search="search">
        <template v-slot:items="props">
          <td>{{ props.item.nombre }}</td>
          <td class="text-xs-center">{{ props.item.carrera }}</td>
          <td class="text-xs-center">{{ props.item.telefono }}</td>
          <td class="text-xs-center">{{ props.item.email }}</td>
          <td class="text-xs-center">{{ props.item.tipo }}</td>
          <td class="text-xs-center">{{ props.item.usuario }}</td>
          <td class="text-xs-center">{{ props.item.password }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table> -->
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
import ProjectService from "@/services/ProjectService"
export default {
  name: "Project",
  data: () => ({
    dialog: false,
    search: "",
    pagination: {},
    selected: [],
    projects: [],
    usuarios: [],
    leader: {},
    currentProject: {},
    newLeaderObject: {}

  }),
  methods: {
    async getProjects() {
      let response = await ProjectService.getProject();
      this.projects = response.data;
      this.projects.forEach(project => {
        if (project._id == this.$route.params.id) {
          this.currentProject = project
        }
      })
    },
    async cargarUsuarios() {
      let response = await UserService.getUsers();
      this.usuarios = response.data;
      console.log(this.usuarios)
    },

    // async agregarUsuario(datos) {
    //   await UserService.addUser(datos);
    // },

    async changeLeader(datos) {
      await ProjectService.updateProject(datos);
    },

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
      // Change Project Leader
      // console.log(this.leader.new._id)
      this.newLeaderObject = this.currentProject
      this.newLeaderObject.id_leader = this.leader.new._id

      console.log(this.newLeaderObject)
      this.changeLeader(this.newLeaderObject)
      this.getProjects()
      // if (this.editedIndex > -1) {
      //   Object.assign(this.usuarios[this.editedIndex], this.editedItem);
      //   this.editarUsuario(this.editedItem);
      // } else {
      //   this.usuarios.push(this.editedItem);
      //   await this.agregarUsuario(this.editedItem);
      //   await this.cargarUsuarios();
      // }
      this.close();
    }
  },
  beforeMount() {
    this.cargarUsuarios()
    this.getProjects()
  },
  updated(){
    this.getProjects()
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
