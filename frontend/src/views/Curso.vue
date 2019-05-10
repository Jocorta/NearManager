<template>
  <div>
    <ToolBar/>
    <v-content>
      <Table/>
      <Table2/>
    </v-content>
  </div>
</template>

<script>
import ToolBar from "../components/ToolBar";
import Table from "../components/TableCursosAdmin";
import Table2 from "../components/TableCursos";

export default {
  components: {
    ToolBar,
    Table,
    Table2
  }
};
</script>
