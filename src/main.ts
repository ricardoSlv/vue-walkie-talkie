import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire'
import CompositionApi from '@vue/composition-api'

Vue.config.productionTip = false

Vue.use(firestorePlugin)
Vue.use(CompositionApi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
