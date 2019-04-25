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
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Curso</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.nombre" label="Nombre del Curso"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-combobox
                      v-model="select"
                      :items="editedItem.encargado"
                      label="Encargado"
                    ></v-combobox> <!--Aqui nesecita cargar los usuarios de tipo encargado -->
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.anio" label="Año"></v-text-field>
                </v-flex>
              </v-layout>
              <v-list subheader two-line>
                    <v-subheader>Personas a Asigner</v-subheader>
                      <v-list-tile
                        v-for="item in editedItem.personas"
                        :key="item"
                      >
                        <v-list-tile-content>
                          <v-list-tile-title v-text="item"></v-list-tile-title>
                        </v-list-tile-content>
                          <v-list-tile-action>
                            <v-checkbox></v-checkbox>
                          </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
            </v-container>
          </v-card-text>

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
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CourseService from "@/services/CourseService"
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
      inscritos: [],
      select: "",
      editedIndex: -1,
      editedItem: {
        nombre: '',
        encargado: [],
        anio: 0,
        personas: []
      },
      defaultItem: {
        nombre: '',
        encargado: [],
        anio: 0,
        personas: []
      }
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
        this.select = item.encargado
      },
      deleteItem (item) {
        const index = this.cursos.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.cursos.splice(index, 1)
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
          Object.assign(this.cursos[this.editedIndex], this.editedItem)
        } else {
          this.cursos.push(this.editedItem)
        }
        this.close()
      },
      async cargarCursos() {
        let response = await CourseService.getCourses();
        console.log(response.data);
        this.cursos = response.data;
      },
      async cargarUsuarios() {
        let response = await CourseService.getCourses();
        console.log(response.data);
        this.cursos = response.data;
      }
    }
  }
</script>