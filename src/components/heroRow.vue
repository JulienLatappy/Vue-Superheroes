<template>
    <v-container>
        <v-row
            no-gutters 
            class="rowHero"
            @click="goToHeroProfil(hero)"
        >
            <div class="heroName">
                {{hero.name}}
            </div>
            <div v-if="hero.description" class="heroDescription">
                <span>{{hero.description}}</span>
            </div>
            <div v-else class="heroDescription">
                <span>{{$t('noHeroDescription')}}</span>
            </div>
            <v-card-actions class="buttonsRow">
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
            <div class="heroImgContainer">
                <v-img
                    class="heroImg"
                    :lazy-src="getHeroPics"
                    :src="getHeroPics"
                ></v-img>
            </div>
        </v-row>
    </v-container> 
</template>

<script>
export default {
    name : 'heroRow',
    props: [
        'hero',
    ],
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
    computed: {
        getHeroPics() {
        let src
            if (this.hero.isImgModified) {
                src = `${this.hero.thumbnail.path}`
            }else {
                src = `${this.hero.thumbnail.path}.${this.hero.thumbnail.extension}` 
            }
        return src
      },
      isHeroFavorite() {
        return this.hero.isFavorite
      },
    }
}
</script>

<style scoped>
    .rowHero {
    display:flex;
    flex-direction: column;
    background-color: #151515;
    width:100%;
    height:200px;
    border-radius: 0.5em;
    white-space :pre-wrap; overflow:auto;
    transition: transform .3s;
    color:white;
  }
  .rowHero:hover {
    transition: all 0.3s ease;
    transform: scale(1.02);
    box-shadow: 0 4px 25px 0 rgba(0,0,0,.1);
    cursor: pointer;
    color: rgba(255, 255, 255, 0.8);
    background-color:#851014;
  }
  .heroName {
    width: 40%;
    padding:7px;
    font-size: 1.2em;
    font-weight: 600;
  }
  .heroDescription {
    width: 80%;
    padding:7px;
    margin-left:5px;
    font-family: 'Andale Mono', monospace;
    font-weight: 600;
  }
  .heroImgContainer {
    width:15%;
    height:100%;
  }
  .heroImg{
      width: auto;
      margin-top:12px;
      height: 175px;
      border-radius: 0.5em;
  }
</style>