<template>
    <v-card
        class="card mx-auto my-12"
        max-width="374"
        height="420"
        width="300"
        hover
        rounded="lg"
        z-index="5"
    >
        <v-img
          height="250"
          :src="`${hero.thumbnail.path}.${hero.thumbnail.extension}`"
          @click="goToHeroProfil(hero)"
        ></v-img>
        <v-divider class="red darken-1"></v-divider>
        <v-card-title @click="goToHeroProfil(hero)">{{hero.name}}</v-card-title>
        <v-card-text  max-height="150">
          <div class="descriptionCard" v-if="hero.description.length > 0">{{hero.description.slice(0,35)}}...</div>
          <div class="descriptionCard" v-else>Aucune description.</div>
        </v-card-text>
        <v-divider class="mx-3"></v-divider>
        <v-card-actions>
          <v-btn v-if="!isfavorite && !hero.isFavorite"
            @click="addToFavoriteList(hero)"
            color="grey lighten-2"
          > Ajouter aux favoris <v-icon style="color: #19bb20" >mdi-plus</v-icon>
          </v-btn>
          <v-btn v-if="isfavorite"
            @click="removeHeroFromFavoriteList(hero.id)"
            color="grey lighten-2"
          > Supprimer des favoris <v-icon style="color: rgba(189,25,17,1)">mdi-delete</v-icon>
          </v-btn>
          <v-btn v-if="!isfavorite && isHeroFavorite"
            color="grey lighten-2"
          > Déjà ajouté aux favoris <v-icon style="color #151515">mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name:"heroCard",
    props: [
        'hero',
        'isfavorite'
    ],
    watch: {
      hero() {
        this.$store.getters.isFavorite(this.hero)
      }
    },
    computed: {
      isHeroFavorite() {
        return this.hero.isFavorite
      }
    },
    methods: {
      goToHeroProfil(hero) {
        this.$store.commit('setHero', hero)
        this.$router.push(`Hero/${hero.name}`)
      },
      addToFavoriteList(hero) {
        const message = 'Héro ajouté aux favoris'
        this.$store.dispatch('SET_MESSAGE', message)
        this.$store.commit('add_hero_to_favorite_list', hero)
      },
      removeHeroFromFavoriteList(heroId) {
        const message = 'Héro supprimé des favoris'
        this.$store.dispatch('SET_MESSAGE', message)
        this.$store.commit('remove_hero_from_favorite_list', heroId)
      },  
    },
}
</script>

<style>
  .card {
    
    color:white!important;
    background-color: #151515!important;
    

  }
  .descriptionCard {
    color:white;
    font-weight: 600;
  }
  .card:hover {
    transition: all 0.3s ease;
    background-color: #851014!important;
  }
</style>