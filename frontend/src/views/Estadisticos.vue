<template>
  <div>
    <ToolBar/>
    <v-content>
      <BarChart/>
    </v-content>
  </div>
</template>

<script>
import ToolBar from "../components/ToolBar";
import BarChart from "../components/BarGraph/BarGraph.vue";

export default {
  components: {
    ToolBar,
    BarChart
  }
};
</script>
