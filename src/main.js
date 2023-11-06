import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import clickOutside from '@/directives/clickOutside'
import secondsToMinutesAndSeconds from '@/filters/secondsToMinutesAndSeconds'

Vue.config.productionTip = false

Vue.directive('click-outside', clickOutside)
Vue.filter('secondsToMinutesAndSeconds', secondsToMinutesAndSeconds)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
