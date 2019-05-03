<template>
  <div>
    <template>
      <v-container fluid>
        <v-layout row wrap align-center>

        <v-dialog v-model="dialog" max-width="600px" >
          <v-card>
            <v-card-title>
              <span class="headline">Editar Asistencia</span>
            </v-card-title>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.userName" label="Username del maestro"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4><!--TODO: Aqui nesecita cargar los usuarios de tipo encargado -->
                    <v-select
                      v-model="asistenciaSelect"
                      :items="tipoDeAsistencia"
                      item-text="nombre"
                      label="Tipo de Asistencia"
                    ></v-select>
                  </v-flex>               
                </v-layout>
              </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
      </v-dialog>











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
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              editar
            </v-icon>
          </td>
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
    dialog: false,
    pagination: {},
    selected: [],
    headers: [
      { text: "Usuario", value: "userName", align: "left" },
      { text: "Date", value: "date", align: "center" },
      { text: "Carrera", value: "carrera", align: "center" },
      { text: "Curso", value: "curso", align: "center" },
      { text: "Tipo de Asistencia", value: "tipoAsistencia", align: "center" },
      { text: "Imagen", value: "rutaImagen", align: "center" },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    editedItem: {
      year: "",
      month: "",
      day: "",
      userName: "",
      curso: "",
      tipoAsistencia: "",
      rutaImagen: "",
      carrera: ""
    },
    e6: [],
    e7: "",
    asistencias: [],
    tipoDeAsistencia:["Asistencia","Retardo","Falta", "Justificado"],
    asistenciaSelect: "",
    maestros: [],
    cursos: [],
    editedIndex: -1,

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
    editItem (item) {
      this.editedIndex = this.asistencias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    buscar(){
      // Va a quitar todos los elementos de asistencias[] que no tengan las selecciones del usuario para filtrar:
      this.asistencias.forEach(element => {
        if (this.e6.includes(element.userName) && this.e7 == element.curso) {
          this.asistenciasFiltradas.push(element);
        }
      });
      this.asistencias = this.asistenciasFiltradas;
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      //Edit
      this.editedItem.tipoAsistencia = this.asistenciaSelect;
      Object.assign(this.asistencias[this.editedIndex], this.editedItem);
      this.updateAsistencia(this.editedItem._id,this.editedItem);
      this.close();
    },
    async updateAsistencia(id,curso) {
      await AsistenciaService.updateAsistencia(id,curso);
      this.cargarAsistencias();
    }




  },
  
  beforeMount() {
    this.cargarAsistencias();
    this.cargarUsuarios();
    this.cargarCursos();
  }
};
</script>
