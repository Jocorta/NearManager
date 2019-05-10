<template>
  <div>
    <v-card flat>
    <v-card-title>
      Cursos Actuales
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="cursos"
      :search="search"
    >
      <template v-slot:items="props">
        <td><a @click="cursoAsistencia(props.item)">{{ props.item.nombre }}</a></td>
        <td class="text-xs-center">{{ props.item.encargado }}</td>
        <td class="text-xs-center">{{ props.item.anio }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService"
export default {
  name: "Table",
  data: () => ({
    search: "",
    pagination: {},
    selected: [],
    headers: [
      {
        text: "Nombre del Curso",
        align: "left",
        value: "nombre"
      },
      { text: "Encargado", value: "encargado", align: "center" },
      { text: "Año", value: "anio", align: "center" },
    ],
    cursos: [],
    editedIndex: -1,
    editedItem: {
        nombre: '',
        encargado: '',
        anio: 2019,
        personas: []
      },
  }),
  computed: {
    pages() {
      return this.pagination.rowsPerPage
        ? Math.ceil(this.items.length / this.pagination.rowsPerPage)
        : 0;
    }
  },
  methods:{
            async cargarCursos() {
                let response = await CourseService.getCourses();
                console.log(response.data);
                this.cursos = response.data;
            },
            cursoAsistencia(item){
              this.editedIndex = this.cursos.indexOf(item)
              this.editedItem = Object.assign({}, item)
              this.$store.dispatch("setCursoAsist", item.nombre); 
              this.$router.push("asistencia");
            }  
        },
        beforeMount() {
            this.cargarCursos();
            console.log('BeforeMount');
        }
};
</script>
