<template>
  <div class="heroesContainer">
    <h1>Heroes Page</h1>
    <p style="color:white;opacity: 60%;" class="font-weight-bold">
      Cette page vous permet de découvrir les héros Marvel !
    </p>
    <div v-if="getData">
      <v-row
        no-gutters
      >
        <v-col
          xs="12"
          sm="6"
          md="5"
          lg="3"
          xl="2"
          v-for="hero in getData"
          :key="hero.id"
        >
        <heroCard :hero="hero" :isfavorite='false'/> 
       </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import heroCard from '../components/heroCard.vue';

export default {
    name: 'Heroes',
    components: {
      heroCard
    },
    computed: {
      getData() {
        return this.$store.getters.getDataForHeroespage
      }
    },
    // mounted() {
    //   this.list_of_heroes = this.$store.getters.getDataForHeroespage
    // }
}
</script>

<style scoped>
  .heroesContainer {
    margin-top: 70px;
  }
  .text {
    color:white;
    font-size: 1.1rem;
  }
</style>