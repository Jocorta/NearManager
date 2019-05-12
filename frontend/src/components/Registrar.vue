<template>
  <div>
    <v-card flat>
      <v-card-title>
        <span class="headline">Registro de Usuario</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.nombre" label="Nombre Completo"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-autocomplete :items="carreras" v-model="editedItem.carrera" label="Carrera"></v-autocomplete>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.telefono" label="Telefono"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select :items="tipos" v-model="editedItem.tipo" label="Tipo de Usuario"></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.usuario" label="Usuario"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.password" label="Contraseña"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" flat @click="close">Cancelar</v-btn>
        <v-btn color="indigo" @click="save">Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
export default {
  name: "Table",
  data: () => ({
    carreras: ["Sistemas", "Informatica", "Electrica"],
    tipos: ["Administrador", "Encargado de Curso", "Maestro"],
    editedItem: {
      nombre: "",
      carrera: "",
      telefono: "",
      email: "",
      tipo: "",
      password: "",
      usuario: ""
    },
    defaultItem: {
      nombre: "",
      carrera: "",
      telefono: "",
      email: "",
      tipo: "",
      password: "",
      usuario: ""
    }
  }),
  methods: {
    async agregarUsuario(datos) {
      await UserService.addUser(datos);
    },

    close() {
      this.$router.push("/");
    },

    async save() {
      await this.agregarUsuario(this.editedItem);
      confirm("Se registro correctamente el usuario");
      this.$router.push("/");
    }
  }
};
</script>
