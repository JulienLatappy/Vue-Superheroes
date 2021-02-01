<template>
  <div class="dashboardContainer">
    <div style="display:flex;flex-direction: row;justify-content: space-between">
      <h1>Dashboard</h1>
      <div style=" display:flex;flex-direction: row">
        <div style="margin:5px;">
          <v-btn dark  color="#851616" v-if="isCard" @click="changeDisposition">{{$t('toList')}}</v-btn>
          <v-btn dark  color="#851616" v-if="isList" @click="changeDisposition">{{$t('toCard')}}</v-btn>
        </div>
        <div style="margin: 5px;">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="#851616"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{$t('sortBy')}} {{currentSort}}/{{currentSortDir}}<v-icon>mdi-arrow-{{currentSortDir}}</v-icon>
              </v-btn>
              
            </template>
            <v-list>
              <v-list-item
                class="listitem"
                color="#851616"
                v-for="(item, index) in items"
                :key="index"
                @click="sort(item.params)"
              >
                <v-list-item-title >{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
      <p style="color:white;opacity: 60%;" class="font-weight-bold">
        {{$t('dashboardPageSubtitle')}}
      </p>
    <transition name="fade" mode="out-in">
      <div key=1 v-if="getFavoriteHeroesList && isCard && !isList">
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
        <heroCard :hero="hero" :isfavorite='true'/> 
       </v-col>
      </v-row>
      </div>
      <div v-if="getFavoriteHeroesList && isList && !isCard">
      <heroRow 
        v-for="hero in getFavoriteHeroesList"
        :key="hero.id" 
        :hero="hero" 
        :isfavorite='true' />
      </div>
    </transition>>
  </div>
</template>

<script>
import heroCard from '../components/heroCard.vue';
import heroRow from '../components/heroRow.vue';

import { mapState } from 'vuex';

export default {
    name :'Dashboard',
    data() {
      return {
        list_of_favorite_heroes: [],
        isCard: true,
        isList: false,
        items: 
          [
            { title: 'Trier par noms', params: 'name',},
            { title: 'Trier par id', params: 'id'},
          ],
        currentSort: 'name',
        currentSortDir:'up',
      }
    },
    components: {
      heroCard,
      heroRow
    },
    methods: {
      getData() {
        this.$store.commit('alreadyGetHero')
        this.$store.dispatch("GET_HEROES_LIST")
      },
      changeDisposition() {
        this.isCard = !this.isCard
        this.isList = !this.isList
      },
      sort(params){
        if(params === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='up'?'down':'up';
        }
        this.currentSort = params;
      },
    },
    computed: {
      ...mapState([
        'searchQuery',
        'alreadyGetHero'
      ]),
      getFavoriteHeroesList() {
        if (this.searchQuery) {
          return this.list_of_favorite_heroes.filter((hero)=>{
            return hero.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          })
        }else {
          return this.list_of_favorite_heroes.slice().sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'down') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });
        }
      }
    },
    mounted() {
      console.log(this.alreadyGetHero)
      if(!this.alreadyGetHero){
        this.getData()
      }
      this.list_of_favorite_heroes = this.$store.getters.getHeroesFavoriteList
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