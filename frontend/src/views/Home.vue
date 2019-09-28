<template>
  <div>
    <ToolBar/>
    <v-content>
      <Landing/>
    </v-content>
  </div>
</template>

<script>
import ToolBar from "../components/ToolBar";
import Landing from "../components/Landing";

export default {
  components: {
    ToolBar,
    Landing
  }
};
</script>
