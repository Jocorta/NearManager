<template>
  <div>
    <ToolBar/>
    <v-content>
      <Table/>
    </v-content>
  </div>
</template>

<script>
import ToolBar from "../components/ToolBar";
import Table from "../components/TomaDeAsistencia";

export default {
  components: {
    ToolBar,
    Table
  }
};
</script>
