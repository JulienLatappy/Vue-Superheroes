<template>
  <div class="heroesContainer">
    <div style="display:flex;flex-direction: row;justify-content: space-between"> 
      <h1 class="titleHeroes" >Heroes Page</h1>
      <div style="padding: 5px; display:flex;flex-direction: row">
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
        {{$t('heroesPageTitle')}}
    </p>
    <transition name="fade" mode="out-in">
      <div key=1 v-if="getData && isCard && !isList">
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
      <div v-if="getData && isList && !isCard">
      <heroRow 
        v-for="hero in getData"
        :key="hero.id" 
        :hero="hero" 
        :isfavorite='false' />
      </div>
    </transition>>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import heroCard from '../components/heroCard.vue';
import heroRow from '../components/heroRow.vue';
export default {
    name: 'Heroes',
    data () {
      return {
        list_of_heroes: [],
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
        'searchQuery'
      ]),
      getData() {
        if (this.searchQuery) {
          return this.list_of_heroes.filter((hero)=>{
                    return hero.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          })
        }else {
        return this.list_of_heroes.slice().sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'down') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });
        }
      },
    },
    mounted() {
      this.list_of_heroes = this.$store.getters.getDataForHeroespage
    }
}
</script>

<style scoped>
fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
  .heroesContainer {
    margin-top: 70px;
  }
  .text {
    color:white;
    font-size: 1.1rem;
  }
  .listitem:hover {
    cursor: pointer;
    background-color: rgb(218, 218, 218);
  }
</style>