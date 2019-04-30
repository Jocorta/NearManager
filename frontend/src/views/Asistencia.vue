<template>
  <div>
    <ToolBar/>
    <v-content>
      <Asistencia/>
    </v-content>
  </div>
</template>

<script>
import ToolBar from "../components/ToolBar";
import Asistencia from "../components/Asistencia";

export default {
  components: {
    ToolBar,
    Asistencia
  }
};
</script>
