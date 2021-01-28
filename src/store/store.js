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
       list_of_heroes : null,
       heroes_favorite_list: [],
       hero_to_visit: null,
       hero_data: null,
       message: '',
       alertState: false
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
        }   
    },
    mutations: {
        set_list_of_heroes(state,payload) {
            state.list_of_heroes = payload
        },
        setHero(state, payload) {
            state.hero_to_visit = payload
        },
        set_hero_data(state,payload) {
            state.hero_data = payload
        },
        add_hero_to_favorite_list(state,payload) {
            payload.isFavorite = true
            state.heroes_favorite_list.push(payload)        
        },
        remove_hero_from_favorite_list(state,payload) {
            let index
            if ((index = state.heroes_favorite_list.findIndex(hero => hero.id === payload)) != -1)
                state.heroes_favorite_list.splice(index, 1)
            const hero = state.list_of_heroes.find(hero => (hero.id === payload.id))
            console.log(hero)
            // state.list_of_heroes.find(hero => (hero.id === payload.id)).isFavorite = false  
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
        }
    },
    actions: {
        GET_HEROES_LIST ({
            commit
        }) {
           axios.get(`${settings.API_URL}/v1/public/characters?limit=20&${settings.API_KEY}`,{
            limit: 20
           })
           .then((res) => {
               commit('set_list_of_heroes', res.data.data)
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
        SET_MESSAGE ({
            commit
        }, payload ) {
            commit('setMessage', payload)
        },
        
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
