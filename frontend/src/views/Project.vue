<template>
  <div>
    <ToolBar/>
    <v-content>
      <Project/><ChatRoom/>
      
      
    </v-content>
  </div>
</template>

<script>
  import Project from '../components/Project'
  import ToolBar from '../components/ToolBar'
  import ChatRoom from '../components/ChatRoom'
  import Upload from '../components/Upload'
  export default {
    components: {
      ToolBar,
      ChatRoom,
      Project,
      Upload
    }
  };
</script>
