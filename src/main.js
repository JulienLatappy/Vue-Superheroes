import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/router';
import store from './store/store.js';
import '@mdi/font/css/materialdesignicons.css';
import VueI18n from 'vue-i18n';
import messages from './plugins/messages'

Vue.config.productionTip = false

Vue.use(VueI18n)

const local = navigator.language.substr(0,2)
const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: local,
  messages,
})

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
