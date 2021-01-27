<template>
  <div>
    <v-app-bar
      color="grey darken-4"
      elevation="2"
      dark   
      fixed
    >
      <v-toolbar-title class="ml-4">Vue Super-Heroes</v-toolbar-title><img class="vue_super_heroes_logo" src="../assets/icons/icons8-super-hero-female-64.png" />
      <router-link class="link" to="/Dashboard"><v-toolbar-subtitle class="linkNavBar ml-4">Dashboard</v-toolbar-subtitle></router-link>
      <router-link class="link" to="/Heroes"><v-toolbar-subtitle class="linkNavBar ml-4">Heroes</v-toolbar-subtitle></router-link>
        <v-btn @click="resetState" class="ml-5" >click to reset state</v-btn>
      <v-spacer v-for="n in 15" :key="n.id"></v-spacer>

      <v-text-field
          class="mt-2"
          v-model="search"
          append-icon="mdi-magnify"
      ></v-text-field>
    </v-app-bar>
    <v-navigation-drawer     
      v-model="drawer"
      absolute
      temporary
      color="grey darken-4 grey darken-1"
      style="height: 100%;"
    >
      <v-list
        nav
        absolute
        dense
        class="mt-5"
      >
        <v-list-item-group
          v-model="group"
          active-class="grey darken-1 grey darken-1"
        >
        <router-link class="link" to="/Dashboard">
          <v-list-item>
            <v-list-item-icon>
              <v-icon style="color:white;">mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color:white;">Dashboard</v-list-item-title>
          </v-list-item>
          </router-link>
          <router-link class="link" to="/Heroes">
          <v-list-item>
            <v-list-item-icon>
              <v-icon style="color:white;">mdi-account-supervisor</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="color:white;" >Heroes</v-list-item-title>
          </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
    name: 'navBar',
    data: () => ({
      drawer: false,
      group: null,
      search: ''
    }),
    methods: {
      resetState() {
        this.$store.commit('clear_state')
      }
    }
}
</script>

<style scoped>
  .vue_super_heroes_logo {
    width:35px;
    margin-left:8px;
  }
  .link {
    text-decoration: none;
    color:white;
  }
  .linkNavBar:hover{
    border-bottom: 1px solid white;
    cursor:pointer;
  }
  .text {
    color:white;
    
  }
</style>>

