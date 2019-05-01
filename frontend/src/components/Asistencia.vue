<template>
  <div>
    <template>
      <v-container fluid>
        <v-layout row wrap align-center>
          <v-flex xs12 sm6>
            <v-subheader v-text="'Usuario'"></v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              v-model="e6"
              :items="maestros"
              :menu-props="{ maxHeight: '400' }"
              label="Maestros"
              multiple
              hint="Seleccione los maestros para filtrar"
              persistent-hint
            ></v-select>
          </v-flex>

          <v-flex xs12 sm6>
            <v-subheader v-text="'Curso'"></v-subheader>
          </v-flex>

          <v-flex xs12 sm6>
            <v-select
              v-model="e7"
              :items="cursos"
              label="Cursos"
              chips
              hint="Seleccione el curso"
              persistent-hint
            ></v-select>
          </v-flex>
          <v-flex xs12 wrap text-xs-right>
              <v-btn large color="primary" v-on:click="buscar">Buscar</v-btn>
            </v-flex>
        </v-layout>
      </v-container>
    </template>
    
    <v-card flat>
      <v-card-title>
        Asistencias
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="asistencias" :search="search">
        <template v-slot:items="props">
          <td>{{ props.item.userName }}</td>
          <td class="text-xs-center">{{ props.item.day }}/{{ props.item.month }}/{{ props.item.year }}</td>
          <td class="text-xs-center">{{ props.item.carrera }}</td>
          <td class="text-xs-center">{{ props.item.curso }}</td>
          <td class="text-xs-center">{{ props.item.tipoAsistencia }}</td>
          <td class="text-xs-center">{{ props.item.rutaImagen }}</td>
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
import AsistenciaService from "@/services/AsistenciaService";
import UserService from "@/services/UserService";
import CourseService from "@/services/CourseService";
export default {
  name: "Asistencia",
  data: () => ({
    search: "",
    pagination: {},
    selected: [],
    headers: [
      { text: "Usuario", value: "userName", align: "left" },
      { text: "Date", value: "date", align: "center" },
      { text: "Carrera", value: "carrera", align: "center" },
      { text: "Curso", value: "curso", align: "center" },
      { text: "Tipo de Asistencia", value: "tipoAsistencia", align: "center" },
      { text: "Imagen", value: "rutaImagen", align: "center" }

    ],
    e6: [],
    e7: "",
    asistencias: [],
    maestros: [],
    cursos: [],
    asistenciasFiltradas: []

  }),
  methods: {
    async cargarAsistencias() {
      let response = await AsistenciaService.getAsistencias();
      this.asistencias = response.data;

    },
    async cargarUsuarios() {
      let response = await UserService.getUsers();
      response.data.forEach(element => {
        this.maestros.push(element.nombre);
      });
    },
    async cargarCursos() {
      let response = await CourseService.getCourses();
      response.data.forEach(element => {
        this.cursos.push(element.nombre);
      });
    },
    buscar(){
      // Va a quitar todos los elementos de asistencias[] que no tengan las selecciones del usuario para filtrar:
      this.asistencias.forEach(element => {
        if (this.e6.includes(element.userName) && this.e7 == element.curso) {
          this.asistenciasFiltradas.push(element);
        }
      });
      this.asistencias = this.asistenciasFiltradas;
    }
  },
  
  beforeMount() {
    this.cargarAsistencias();
    this.cargarUsuarios();
    this.cargarCursos();
  }
};
</script>
