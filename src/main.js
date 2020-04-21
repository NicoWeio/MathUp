import Vue from 'vue'
import App from './App.vue'

import VueMathjax from 'vue-mathjax'
import VueClipboard from 'vue-clipboard2'

Vue.use(VueMathjax)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
