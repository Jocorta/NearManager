<template>
  <div>
    <v-card flat>
      <!-- <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Buscar" single-line hide-details></v-text-field>
      </v-card-title> -->
      <v-toolbar flat color="white">
        <v-toolbar-title>Wellcome to Near Manager! This is Landing.vue in Components</v-toolbar-title>
        <!-- <v-divider class="mx-2" inset vertical></!-->
        <!-- <v-spacer></v-spacer> -->
        <v-dialog v-model="dialog" max-width="500px">
          <!-- <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Agregar</v-btn>
          </template> -->
          <v-card>
            <v-card-title>
              <span class="headline">Create Project</span>
            </v-card-title>

            <v-card-text>
              
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-flex>
                  <!-- <v-flex xs12 sm6>
                    <v-autocomplete :items="carreras" v-model="editedItem.carrera" label="Carrera"></v-autocomplete>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.telefono" label="Telefono"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select :items="tipos" v-model="editedItem.tipo" label="Tipo"></v-select>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.usuario" label="Usuario"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.password" label="Contraseña"></v-text-field>
                  </v-flex> -->
                </v-layout>
              </v-container>
            </v-card-text>
            
          </v-card>
        </v-dialog>
      </v-toolbar>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-p>The following is the create project area for Near-Manager phase 1.</v-p>
                </v-layout>
                <v-flex xs12 sm6>
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-flex>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn> -->
              <v-btn color="orange" dark id="popover-target-1" flat >
                Create Project
              </v-btn>
              <b-popover target="popover-target-1" triggers="hover" placement="top">
                <template v-slot:title>Just a reminder...</template>
                This will automatically assign you as the project leader! Make sure you are your company's project leader before creating the project.
              </b-popover>
            </v-card-actions>
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
export default {
  name: "Project",
  data: () => ({
    dialog: false,
    search: "",
    pagination: {},
    editedItem: {
      name: ""
    },
    selected: []
  }),
  methods: {
    // async cargarUsuarios() {
    //   let response = await UserService.getUsers();
    //   this.usuarios = response.data;
    // },

    // async agregarUsuario(datos) {
    //   await UserService.addUser(datos);
    // },

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

    // close() {
    //   this.dialog = false;
    //   setTimeout(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem);
    //     this.editedIndex = -1;
    //   }, 300);
    // },

    // async save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.usuarios[this.editedIndex], this.editedItem);
    //     this.editarUsuario(this.editedItem);
    //   } else {
    //     this.usuarios.push(this.editedItem);
    //     await this.agregarUsuario(this.editedItem);
    //     await this.cargarUsuarios();
    //   }
    //   this.close();
    // }
  },
  beforeMount() {
    // this.cargarUsuarios();
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
