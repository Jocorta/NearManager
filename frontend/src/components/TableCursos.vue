<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-card-title>
          Cursos
          <v-spacer></v-spacer>
          <v-text-field
            :append-icon="search?'close':'search'"
            :append-icon-cb="() => (search = '')"
            @keydown.native.escape="search=''"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <div>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="items"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            hide-actions
            class="elevation-1"
          >
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">{{ props.header.text }}</span>
                <span>{{ props.header.text }}</span>
              </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.calories }}</td>
              <td class="text-xs-center">{{ props.item.fat }}</td>
              <td class="text-xs-center">{{ props.item.carbs }}</td>
              <td class="text-xs-center">{{ props.item.protein }}</td>
              <td class="text-xs-center">{{ props.item.sodium }}</td>
              <td class="text-xs-center">{{ props.item.calcium }}</td>
              <td class="text-xs-center">{{ props.item.iron }}</td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </div>
      </v-card-text>

      <div style="flex: 1 1 auto;"></div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Table",
  data: () => ({
    search: "",
    pagination: {},
    selected: [],
    headers: [
      {
        text: "Curso",
        align: "left",
        value: "name"
      },
      { text: "Encargado", value: "encargado", align: "center" },
      { text: "Año", value: "anio", align: "center" }
    ],
    items: [
      {
        value: false,
        name: "Frozen Yogurt",
        encargado: 159
      },
      {
        value: false,
        name: "Ice cream sandwich",
        calories: 237
      },
      {
        value: false,
        name: "Eclair",
        calories: 262
      },
      {
        value: false,
        name: "Cupcake",
        calories: 305
      },
      {
        value: false,
        name: "Gingerbread",
        calories: 356
      },
      {
        value: false,
        name: "Jelly bean",
        calories: 375
      },
      {
        value: false,
        name: "Lollipop",
        calories: 392
      },
      {
        value: false,
        name: "Honeycomb",
        calories: 408
      },
      {
        value: false,
        name: "Donut",
        calories: 452
      },
      {
        value: false,
        name: "KitKat",
        calories: 518
      }
    ]
  }),
  computed: {
    pages() {
      return this.pagination.rowsPerPage
        ? Math.ceil(this.items.length / this.pagination.rowsPerPage)
        : 0;
    }
  }
};
</script>
