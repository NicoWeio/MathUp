import Vue from 'vue'
import App from './App.vue'

import VueMathjax from 'vue-mathjax'
Vue.use(VueMathjax)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
