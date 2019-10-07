<template>
  <div>
    <ToolBar/>
    <v-content>
      <Project/>
    </v-content>
  </div>
</template>

<script>
  import Project from '../components/Project'
  import ToolBar from '../components/ToolBar'
  export default {
    components: {
      ToolBar,
      Project
    }
  };
</script>
