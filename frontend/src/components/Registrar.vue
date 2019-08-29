<template>
  <div>
    <v-card flat>
      <v-card-title>
        <span class="headline">User Register</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.nombre" label="Full Name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.usuario" label="Username"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" flat @click="close">Cancel</v-btn>
        <v-btn color="indigo" @click="save">Register</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
export default {
  name: "Table",
  data: () => ({
    editedItem: {
      nombre: "",
      email: "",
      password: "",
      usuario: ""
    },
    defaultItem: {
      nombre: "",
      email: "",
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
      confirm("User register complete.");
      this.$router.push("/");
    }
  }
};
</script>
