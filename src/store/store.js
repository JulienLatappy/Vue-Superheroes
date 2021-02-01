import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import settings from '../../public/settings.json';

const axios = require('axios').default;
const ls = new SecureLS({ encodingType: 'aes'});

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
       list_of_heroes : [],
       heroes_favorite_list: [],
       hero_to_visit: null,
       hero_data: null,
       message: '',
       alertState: false,
       searchQuery: '',
       alreadyGetHero : false
       
    },
    getters: {
        getDataForHeroespage: (state) => {
            return state.list_of_heroes.results
        },
        getHeroesFavoriteList: (state) => {
            return state.heroes_favorite_list  
        },
        isFavorite: (state) => (payload) => {
            console.log(payload)
            const isheroFavorite = state.heroes_favorite_list.find(hero => (hero.id === payload.id))
            if (isheroFavorite) {
                return true
            }else {
                return false
            }
        },
        getCount: (state) => {
            if(state.list_of_heroes){
                return state.list_of_heroes.count
            }else {
                return 0
            }
        }
    },
    mutations: {
        set_list_of_heroes(state,payload) {
            state.list_of_heroes = payload
        },
        set_more_heroes_to_list(state,payload) {
            const list = state.list_of_heroes
            list.count += payload.count
            list.results.push(...payload.results)
        },
        setHero(state, payload) {
            state.hero_to_visit = payload
        },
        set_hero_data(state,payload) {
            state.hero_data = payload
        },
        add_hero_to_favorite_list(state,payload) {
            const favlist = state.heroes_favorite_list
            const herolist = state.list_of_heroes

            if(favlist.find(hero => hero.id === payload.id)) {
                return console.log('Héro déjà ajouté')
            }else {
                const hero = herolist.results.find(hero => (hero.id === payload.id));
                Vue.set(payload, 'isFavorite',true)
                Vue.set(hero, 'isFavorite',true)
                favlist.push(payload)        
            }
        },
        remove_hero_from_favorite_list(state,payload) {
            let index
            const favlist = state.heroes_favorite_list
            
            if ((index = favlist.findIndex(hero => hero.id === payload)) != -1)
                console.log(favlist[index])
                favlist[index].isFavorite = false
                favlist.splice(index, 1)
        },
        update_hero_data(state,payload) {
            const heroesList = state.list_of_heroes;
            const hero = heroesList.results.find(hero => (hero.id === payload.heroId));
            hero.name = payload.name
            hero.description = payload.description
            console.log(hero,payload)
            if (payload.img) {
                if (hero.thumbnail.path !== payload.img) {
                    hero.thumbnail.path = payload.img
                    hero.isImgModified = true               
                }
            }
        },
        set_query(state,message) {
            state.searchQuery = message            
        },
        setMessage(state,payload) {
            state.message = payload
            state.alertState = true
        },
        clear_alert_state(state) {
            state.alertState = false
            state.message = ''
        },
        clear_state(state) {
            state.list_of_heroes = null
            state.heroes_favorite_list = []
            state.hero_to_visit = null
            state.hero_data = null
            state.alertState = false
            state.message = ''
            state.alreadyGetHero = false
        },
        alreadyGetHero(state) {
            state.alreadyGetHero = true
        }
    },
    actions: {
        GET_HEROES_LIST ({
            commit
        }) {
            axios.get(`${settings.API_URL}/v1/public/characters?limit=20&${settings.API_KEY}`)
            .then((res) => {
                commit('set_list_of_heroes', res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        GET_MORE_HEROES_LIST ({
            commit,
            state
        }) {
            const offset = state.list_of_heroes.count
            axios.get(`${settings.API_URL}/v1/public/characters?limit=100&offset=${offset}&${settings.API_KEY}`)
            .then((res) => {
                commit('set_more_heroes_to_list', res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        GET_HERO_DATA ({
            commit,
            state
        }){
           axios.get(`${settings.API_URL}/v1/public/characters/${state.hero_to_visit.id}?${settings.API_KEY}`)
            .then((res) => {
                commit('set_hero_data', res.data)
            }).catch((err) => {
                console.log(err)
            })
        },
        ADD_HERO_TO_FAVORITE_LIST ({
            commit
        }, payload) {
            commit('add_hero_to_favorite_list', payload)
        },
        SET_MESSAGE ({
            commit
        }, payload ) {
            commit('setMessage', payload)
        },
        UPDATE_HERO_DATA ({
            commit
        }, payload) {
            commit('update_hero_data', payload)
        } 
    },
    plugins: [createPersistedState({
        storage: {
            getItem: key => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: key => ls.remove(key)
          },  
        // reducer(val) {
        //     if (!auth.getters.isAuthenticated(val.auth))
        //         return {}
        //     return val
        // }
    })]
})
