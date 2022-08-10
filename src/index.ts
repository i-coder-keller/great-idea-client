import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'reset-css'
import './styles/global.less'
import './styles/fonts.less'
import router from './router'

const pinia = createPinia()
createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
