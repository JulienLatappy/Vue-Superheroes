<template>
  <div class="dashboardContainer">
      <h1>Dashboard</h1>
      <p style="color:white;opacity: 60%;" class="font-weight-bold">
        Tout vos héros favoris sont ici !
      </p>
      <v-btn @click="getData" depressed dark>
      Normal
    </v-btn>
    <div v-if="getFavoriteHeroesList">
      <v-row
        no-gutters
      >
        <v-col
          xs="12"
          sm="6"
          md="5"
          lg="3"
          xl="2"
          v-for="hero in getFavoriteHeroesList"
          :key="hero.id"
        >
        <transition name="fade">
            <heroCard :hero="hero" :isfavorite='true'/> 
        </transition>
       </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import heroCard from '../components/heroCard.vue';


export default {
    name :'Dashboard',
    components: {
      heroCard
    },
    methods: {
      getData() {
        this.$store.dispatch("GET_HEROES_LIST")
      },
    },
    computed: {
      getFavoriteHeroesList() {
        return this.$store.getters.getHeroesFavoriteList
      }
    }
}
</script>

<style scoped >
  .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  .dashboardContainer {
    margin-top:70px;
  }
</style>