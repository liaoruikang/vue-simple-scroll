import Vue from 'vue'
import App from './App.vue'
// import simple from 'vue-simple-scroll-plugin'

// Vue.use(simple)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
