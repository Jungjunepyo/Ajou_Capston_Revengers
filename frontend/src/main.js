import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
import VueAxios from 'vue-axios'




Vue.config.productionTip = false
Vue.use(VueLocalStorage)
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')