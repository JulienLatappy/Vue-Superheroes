<template>
  <div>
      <navBar />
      <alert :message="message" :alertState="alertState" class="alert" />
      <v-container class="container"   fluid>
          <router-view />
      </v-container>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import alert from '../components/alert.vue';
import { mapState } from "vuex";

export default {
    name: 'AppContainer',
    components: {
    navBar,
    alert
  },
  computed: {
    ...mapState([
      'message',
      'alertState'
    ])
  }
}
</script>

<style scoped>

  .container {
    min-height:100vh;
    background: rgb(124,24,4);
    background: linear-gradient(262deg, rgba(124,24,4,1) 0%, rgba(189,25,17,1) 42%, rgba(175,53,6,1) 100%);
  }
  .alert {
    position:absolute;
    right: 0;
    margin-top:90px;
    margin-right:15px;
  }
</style>