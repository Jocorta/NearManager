<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Cursos</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="600px" >
        <template v-slot:activator="{ on }" >
          <v-btn color="primary" dark class="mb-2" v-on="on"  @click="limpiar">Nuevo Curso</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.nombre" label="Nombre del Curso"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4><!--TODO: Aqui nesecita cargar los usuarios de tipo encargado -->
                  <v-select
                    v-model="editedItem.encargado"
                    :items="encargados"
                    item-text="nombre"
                    label="Instructor"
                  ></v-select>
                </v-flex>               
              </v-layout>
              <v-container align="center">
                <v-layout>
                  <v-list subheader two-line>
                    <v-subheader>Personas Inscritas</v-subheader>
                      <v-list-tile
                        v-for="item in maestros"
                        :key="item._id"
                      >
                      <v-list-tile-content>                          
                        <span class="checkbox-label"> {{item.nombre}} </span>               
                      </v-list-tile-content>
                      <v-list-tile-action>                           
                        <input type="checkbox" :value="item.nombre" v-model="inscritos" display="inline-block" scale="1.5">   
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
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="cargarCursos">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService"
import UserService from "@/services/UserService"
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
      cursos: [],
      users: [],
      maestros: [],
      inscritos: [],    
      encargados: [],
      editedIndex: -1,
      deletedIndex: -1,
      editedItem: {
        nombre: '',
        encargado: '',
        anio: 2019,
        personas: []
      },
      defaultItem: {
        nombre: '',
        encargado: '',
        anio: 2019,
        personas: []
      },
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
      editItem (item) {
        this.editedIndex = this.cursos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        this.inscritos = item.personas
      },
      deleteItem (item) {
        const index = this.cursos.indexOf(item)
        let conf = confirm('Are you sure you want to delete this item?'); 
        if(conf){
          this.deleteCurso(item._id)
          this.cursos.splice(index, 1)
        }
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      save () {
        if (this.editedIndex > -1) {
          //Edit
          this.editedItem.personas = this.inscritos;
          Object.assign(this.cursos[this.editedIndex], this.editedItem)
          this.updateCurso(this.editedItem._id,this.editedItem)
        } else {
          //Nuevo
          this.editedItem.personas = this.inscritos;
          this.cursos.push(this.editedItem)
          this.crearCurso(this.editedItem)
        }
        this.close()
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
      async crearCurso(curso) {
        await CourseService.createCourse(curso);
        this.cargarCursos();
      },
      async updateCurso(id,curso) {
        await CourseService.updateCourse(id,curso);
        this.cargarCursos();
      },
      async deleteCurso(idCurso) {
        console.log(idCurso);
        await CourseService.deleteCourse(idCurso);
        this.cargarCursos();
      },
      filtrarUsuarios(){
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].tipo == 'Maestro') {
            this.maestros.push(this.users[i]);
          } else if (this.users[i].tipo == 'Encargado de Curso') {
            this.encargados.push(this.users[i]);
          }        
        }
      },
      limpiar(){
        this.inscritos = [];
        console.log('Limpiado');
      }
    },
    beforeMount() {
      this.cargarCursos();
      this.cargarUsuarios();               
    }
  }
</script>