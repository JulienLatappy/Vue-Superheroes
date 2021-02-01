<template>
  <div class="heroesContainer">
    <div style="display:flex;flex-direction: row;justify-content: space-between"> 
      <h1 class="titleHeroes" >Heroes Page</h1>
      <div class="filter_buttons_container">
        <v-menu v-if="getData.length >= 20" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                style="margin:5px;"
                v-bind="attrs"
                v-on="on"
                dark
                color="#851616"
              >
                {{$t('resultByPage')}} <v-icon>mdi-chevron-down</v-icon>({{elemByPage}})
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                class="listitem"
                color="#851616"
                v-for="(item, index) in resultByPage"
                :key="index"
                @click="setResultByPage(item.nbr)"
              >
                <v-list-item-title >{{ item.nbr }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
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
    </transition>
    <transition name="fade">
    <v-btn
      elevation="2"
      style="position:fixed;bottom: 0;right:0;margin:25px;background-color:#851616"
      fab
      dark
      v-if="showToTopButton"
      @click="toTop">
    <v-icon>mdi-arrow-up</v-icon></v-btn>
    </transition>
    <div class="text-center">
    <v-container v-if="getCount" style="max-width:600px;">
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="currentPage"
              dark
              class="my-4"
              :length="totalPages"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
    <v-btn v-if="currentPage === totalPages || totalPages === 0"
      elevation="2"
      style="width:30%;margin-left: 35%;background-color:#851616"
      dark
      @click="loadMoreHeroes">
    {{$t('loadMoreHeros')}}</v-btn>
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
        resultByPage: 
          [
            { nbr: '20'},
            { nbr: '40'},
            { nbr: '60'},
            { nbr: '80'},
            { nbr: '100'}
          ],
        elemByPage: 20,
        isSliced: true,
        currentSort: 'name',
        currentSortDir:'up',
        isFiltered: false,
        showToTopButton: false,
        currentPage: 1,
      }
    },
    components: {
      heroCard,
      heroRow
    },
    methods: {
      handleScroll () {
        window.pageYOffset > 500 ? this.showToTopButton = true : this.showToTopButton = false;
      },
      changeDisposition() {
        this.isCard = !this.isCard
        this.isList = !this.isList
      },
      sort(params){
        if(params === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='up'?'down':'up';
        }
        this.isFiltered = true
        this.currentSort = params;
      },
      setResultByPage(nombresByPage) {
        this.elemByPage = nombresByPage
      },
      setPage: function(pageNumber) {
          this.currentPage = pageNumber
      },
      toTop() {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      },
      loadMoreHeroes() {
        this.$store.dispatch('GET_MORE_HEROES_LIST')
      }

    },
    computed: {
      ...mapState([
        'searchQuery',
      ]),
      getData() {
        // search by query with searchbar//
        if (this.searchQuery) {
          return this.list_of_heroes.filter((hero)=>{
            return hero.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          })
        }
        // pagination system //
        if (this.currentPage > 1 ) {
          var index = this.currentPage * parseInt(this.elemByPage)
          return this.list_of_heroes.slice(index, index + parseInt(this.elemByPage))
        }
        // heroes/pages system //
        if (this.isSliced) {
           return this.list_of_heroes.slice(0, this.elemByPage)
        }
        // filter : alpha(asc/desc), id(asc,desc)  //
        /// A retravailler, peut être isoler les différentes fonctions de tri ///
        else {
          return this.list_of_heroes.slice().sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'down'){
              modifier = -1;
            } 
            if(a[this.currentSort] < b[this.currentSort]) {
              return -1 * modifier;
            } 
            if(a[this.currentSort] > b[this.currentSort]) {
              return 1 * modifier;
            } 
            return 0;
        });
        }
      },
      getCount() {
        return this.$store.getters.getCount
      },
      totalPages: function() {
          return ((this.getCount / this.elemByPage))
      }
    },
    mounted() {
      this.list_of_heroes = this.$store.getters.getDataForHeroespage
    },
    created () {
    window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
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
.filter_buttons_container {
  display: flex;
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
  .v-pagination__more{
    color:white;
  }

  @media screen and (max-width: 750px) {
    .filter_buttons_container {
      display: flex;
      flex-direction: column;
      text-align: right;
    }
}
</style>