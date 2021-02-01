<template>
    <v-card
        class="card mx-auto my-12"
        max-width="374"
        height="420"
        width="300"
        hover
        rounded="lg"
        z-index="5"
        @click="goToHeroProfil(hero)"
    >
        <v-img
          height="250"
          :lazy-src="getHeroPics"
          :src="getHeroPics"
        ></v-img>
        <v-divider class="red darken-1"></v-divider>
          <v-card-title 
            :title="hero.name" 
            class="heroName"
            >{{hero.name}}</v-card-title>
        <v-card-text  max-height="150">
          <div class="descriptionCard" v-if="hero.description.length > 0">{{hero.description.slice(0,35)}}...</div>
          <div class="descriptionCard" v-else>{{$t('noHeroDescription')}}</div>
        </v-card-text>
        <v-divider class="mx-3"></v-divider>
        <v-card-actions >
          <v-btn v-if="!hero.isFavorite"
            @click.stop="addToFavoriteList(hero)"
            color="grey lighten-2"
          > {{$t('addToFavorite')}} <v-icon style="color: #19bb20" >mdi-plus</v-icon>
          </v-btn>
          <v-btn v-if="hero.isFavorite && this.$route.path === '/Dashboard'"
            @click.stop="removeHeroFromFavoriteList(hero.id)"
            color="grey lighten-2"
          > {{$t('deleteFromFavorite')}} <v-icon style="color: rgba(189,25,17,1)">mdi-delete</v-icon>
          </v-btn>
          <v-btn v-if="hero.isFavorite && this.$route.path === '/Heroes'"
            color="grey lighten-2"
          > {{$t('alreadyAddToFavorite')}} <v-icon style="color #151515">mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name:"heroCard",
    props: [
        'hero',
    ],
    watch: {
      hero() {
        this.$store.getters.isFavorite(this.hero)
      }
    },
    computed: {
      isHeroFavorite() {
        return this.hero.isFavorite
      },
      getHeroPics() {
        let src
        if (this.hero.isImgModified) {
          src = `${this.hero.thumbnail.path}`
        }else {
          src = `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}` 
        }
        return src
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
        this.$store.dispatch('ADD_HERO_TO_FAVORITE_LIST', hero)
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
  .heroName{
    width:90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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