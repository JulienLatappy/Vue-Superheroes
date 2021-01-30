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
      <router-link class="link" to="/Heroes"><v-toolbar-subtitle class="linkNavBar ml-4">{{$t('hero')}}</v-toolbar-subtitle></router-link>
        <v-btn @click="resetState" class="ml-5" >{{$t('resetState')}}</v-btn>
      <v-spacer v-for="n in 15" :key="n.id"></v-spacer>
      <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                style="margin-right:5px"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{$t('lang')}} <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
              
            </template>
            <v-list dark>
              <v-list-item
                class="listitem"
                color="#851616"
                @click="setLocale('fr')"
              >
                <v-list-item-title >{{$t('French')}}
                <img class="flag1" src="../assets/icons/icons8-france-48.png"/></v-list-item-title>
              </v-list-item>
              <v-list-item
                class="listitem"
                color="#851616"
                @click="setLocale('en')"
              >
                <v-list-item-title >{{$t('English')}}
                <img class="flag2" src="../assets/icons/icons8-great-britain-48.png"/></v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      <v-text-field
          class="mt-2"
          @input="search"
          :value="message"
          append-icon="mdi-magnify"
      ></v-text-field>
    </v-app-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'navBar',
    data: () => ({
      items: 
          [
            { lang: 'Français', path: '../assets/icons/icons8-france-48.png'},
            { lang: 'Anglais', path: '../assets/icons/icons8-great-britain-48.png'},
          ],
    }),
    methods: {
      resetState() {
        this.$store.commit('clear_state')
      },
      search(e) {
        this.$store.commit('set_query', e)
      },
      setLocale: function(locale) {
          this.$i18n.locale = locale
      },
    },
    computed: {
      ...mapState({
        message: state => state.searchQuery
      }),
    },
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
  .listitem{
    display:block;
  }
  .flag1  {
    width:25px;
    margin-top:10px;
  }
  .flag2  {
    width:25px;
    margin-top:10px;
    margin-left: 10px;
  }
</style>

