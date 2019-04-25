<template>
  <div>
    <v-card flat>
      <v-card-title>
        Usuarios
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="usuarios" :search="search">
        <template v-slot:items="props">
          <td>{{ props.item.usuario }}</td>
          <td class="text-xs-center">{{ props.item.password }}</td>
          <!--<td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="text-xs-right">{{ props.item.protein }}</td>
          <td class="text-xs-right">{{ props.item.iron }}</td>-->
        </template>
        <template v-slot:no-results>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/UserService";
export default {
  name: "Table",
  data: () => ({
    search: "",
    pagination: {},
    selected: [],
    headers: [
      { text: "Nombre", value: "usuario", align: "left" },
      { text: "Calories", value: "calories", align: "center" },
      { text: "Fat (g)", value: "fat", align: "center" },
      { text: "Carbs (g)", value: "carbs", align: "center" },
      { text: "Protein (g)", value: "protein", align: "center" },
      { text: "Sodium (mg)", value: "sodium", align: "center" },
      { text: "Calcium (%)", value: "calcium", align: "center" },
      { text: "Iron (%)", value: "iron", align: "center" }
    ],
    usuarios: []
  }),
  methods: {
    async cargarUsuarios() {
      let response = await UserService.getUsers();
      this.usuarios = response.data;
    }
  },
  beforeMount() {
    this.cargarUsuarios();
  }
};
</script>
