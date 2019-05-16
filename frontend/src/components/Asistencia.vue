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
                    <v-text-field v-model="editedItem.userName" label="Username del maestro" disabled></v-text-field>
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
        </v-layout>
      </v-container>
    </template> 
    <v-card flat>
      <v-card-title>
        <h1>Asistencias del Curso: {{$store.state.cursoAsist}}</h1>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="asistenciasCursales" :search="search">
        <template v-slot:items="props">
          <td>{{ props.item.userName}}</td>
          <td class="text-xs-center">{{ props.item.date}}</td>
          <td class="text-xs-center">{{ props.item.carrera }}</td>
          <td class="text-xs-center">{{ props.item.tipoAsistencia}}</td>
          <td class="text-xs-center">{{ props.item.rutaImagen }}</td>
          <td class="justify-center layout px-0" >
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
      { text: "Dia", value: "date", align: "center" },
      { text: "Carrera", value: "carrera", align: "center" },
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
    editedItem: { //formato de tabla
      date: "",
      userName: "",
      curso: "",
      carrera: "",
      tipoAsistencia: "",
      rutaImagen: "",
    },
    asistencias: [], // arreglo de asistencias completas
    maestros: [], //arreglo de maestros completo
    cursos: [], // arreglo de cursos completo

    asistenciasCursales: [], //arreglo con solo las asistencias de este curso

    tipoDeAsistencia:["Asistencia","Retardo","Falta", "Justificado"],
    asistenciaSelect: "", //donde se guarda resultado de combobox 

    editedIndex: -1
  }),
  methods: {
    async cargarAsistencias() {
      this.asistencias = [];
      this.asistenciasCursales = [];
      let response = await AsistenciaService.getAsistencias();
      this.asistencias = response.data;    
      this.asistencias.forEach(element => {
        if(element.curso === this.$store.state.cursoAsist)
        {
          this.asistenciasCursales.push(element);
        }
      });
    },
    editItem (item) {
      this.editedIndex = this.asistenciasCursales.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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
      this.editedItem.tipoAsistencia = this.asistenciaSelect; //actualiza la asistencia seleccioonada
      Object.assign(this.asistenciasCursales[this.editedIndex], this.editedItem); //salva la asistencia editada en el arreglo de tablaDatos
      this.updateAsistencia(this.editedItem._id,this.editedItem); // actualiza en la bd con el formato
      this.close();
    },
    async updateAsistencia(id,curso) {
      await AsistenciaService.updateAsistencia(id,curso);    
      this.cargarAsistencias();
    },
  },
  
  beforeMount() {
    this.cargarAsistencias();
  }
};
</script>
