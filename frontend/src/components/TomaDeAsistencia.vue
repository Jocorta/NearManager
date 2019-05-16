<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Toma de Asistencia</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="600px" >
        <v-card>
          <v-card-title>
            <span class="headline">Tomar Asistencia</span>
          </v-card-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.nombre" label="Nombre del Curso" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4><!--TODO: Aqui nesecita cargar los usuarios de tipo encargado -->
                  <v-text-field v-model="editedItem.encargado" label="Encargado del Curso" disabled></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.anio" label="Año" disabled></v-text-field>
                </v-flex>               
              </v-layout>
              <v-container align="center">
                <v-layout>
                  

                <v-list
          subheader
          three-line
        >
          <v-subheader>General</v-subheader>
                      <v-list-tile
                        v-for="item, key in editedItem.personas"
                      >
                      <v-list-tile-content>
                      <v-text-field disabled v-model="editedItem.personas[key]"></v-text-field>
                      </v-list-tile-content>

                      <v-list-tile-action xs12>
                      </v-list-tile-action>

                      <v-list-tile-action>
                        <v-select v-model="tomaDeAsistencia[key]":items="tipoDeAsistencia">
                        </v-select>
                      </v-list-tile-action>
                      </v-list-tile>

            
        </v-list>


                </v-layout>
              </v-container>             
            </v-container>           
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="cursos"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.nombre }}</td>
        <td class="text-xs-right">{{ props.item.encargado }}</td>
        <td class="text-xs-right">{{ props.item.anio }}</td>
        <td class="text-xs-right">{{ props.item.personas.length }}</td>
        <td class="justify-center layout px-0">
          <v-btn color="primary" dark class="mb-2" @click="editItem(props.item)">Tomar Asistencia</v-btn>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService"
import UserService from "@/services/UserService"
import AsistenciaService from "@/services/AsistenciaService"


  export default {          
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Nombre del Curso',
          align: 'left',
          sortable: false,
          value: 'nombre'
        },
        { text: 'Encargado', value: 'encargado',align: 'right'},
        { text: 'Año', value: 'anio',align: 'right' },
        { text: 'Personas Inscritas', value: 'personas',align: 'right' },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      tipoDeAsistencia:["Asistencia","Retardo","Falta", "Justificado"],
      tomaDeAsistencia: [],
      cursos: [],
      instructores: [],
      instructoNombres: [],
      users: [],
      maestros: [],
      inscritos: [],
      selectedInstructor: "",
      editedIndex: -1,
      deletedIndex: -1,
      magic: "",
      magic2: "",
      editedItem: {
        nombre: '',
        encargado: [],
        anio: 2019,
        personas: []
      },
      defaultItem: {
        nombre: '',
        encargado: [],
        anio: 2019,
        personas: []
      },
      datosAsistencia:{
        date: "",
        userName: "",
        curso: "",
        tipoAsistencia: "",
        rutaImagen: "",
        carrera: ""
      },
      datosAsistenciaFinal: []
    }),
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
    methods: {
      initialize () {
        this.cargarCursos();
      },
      editItem (item) {
        this.editedIndex = this.cursos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.selectedInstructor = item.encargado
        this.inscritos = item.personas
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        //Nuevo
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1; //January is 0!
          var yyyy = today.getFullYear();
          var cont = 0;
          this.editedItem.personas.forEach(item => {
            //llenar variables
            this.datosAsistencia = {
              year: "",
              month: "",
              day: "",
              userName: "",
              curso: "",
              tipoAsistencia: "",
              rutaImagen: "",
              carrera: ""
            };
            this.datosAsistencia.date = yyyy + "/" + mm + "/" + dd
            this.obtenerUsuario(item);
            this.datosAsistencia.userName        = this.magic;
            // console.log(this.datosAsistencia.userName);
            this.datosAsistencia.curso           = this.editedItem.nombre;
            this.datosAsistencia.tipoAsistencia  = this.tomaDeAsistencia[cont];
            cont++;
            this.datosAsistencia.rutaImagen      = "";
            this.datosAsistencia.carrera         = this.magic2;
            //Enviar nueva asistencia
            // console.log(this.datosAsistencia);
            // console.log('-------');
            this.crearAsistencia(this.datosAsistencia);
            // this.datosAsistenciaFinal.push(this.datosAsistencia);
            
          });
        console.log(this.datosAsistenciaFinal);
        this.close()
      },
      obtenerUsuario(nombre){
        this.maestros.forEach(item =>{
          if(item.nombre === nombre)
          {
            //console.log(item.usuario);
            this.magic = item.usuario;
            this.magic2 = item.carrera;
          }
          else
          {
            return "";
          }
        });
      },
      async cargarCursos() {
        let response = await CourseService.getCourses();
        this.cursos = response.data;
      },
      async cargarUsuarios() {
        let response1 = await UserService.getUsers();
        this.users = response1.data;
        this.filtrarUsuarios();
      },
      async crearAsistencia(assist) {
        await AsistenciaService.addAsistencia(assist);
      },
      async updateCurso(id,curso) {
        await CourseService.updateCourse(id,curso);
        this.cargarCursos();
      },
      async deleteCurso(idCurso) {
        console.log(idCurso);
        await CourseService.deleteCourse(iDCurso);
        this.cargarCursos();
      },
      filtrarUsuarios(){
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].tipo == 'Maestro') {
            this.maestros.push(this.users[i]);
          } else if (this.users[i].tipo == 'Encargado de Curso') {
            this.instructores.push(this.users[i]);
          }
        }
      },
      limpiar(id){
        this.dialog = true;
        // this.inscritos = [];
        // this.selectedInstructor="";
        // console.log('Limpiado');
      }
    },
        beforeMount() {
            this.cargarCursos();
            this.cargarUsuarios();
            //console.log('BeforeMount');
            //console.log(this.users);
            //console.log(this.instructores);
            console.log(this.instructores);
        }
  }
</script>