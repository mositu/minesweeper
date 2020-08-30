import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// bus总线
const bus = new Vue()
Vue.prototype.$bus = bus

import '@/assets/scss/index.scss'

// import fastClick from 'fastclick'
// fastClick.attach(document.body);

new Vue({
  render: h => h(App),
}).$mount('#app')
