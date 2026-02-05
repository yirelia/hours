import { createApp } from 'vue'
import App from './app/App.vue'
import { router } from './app/router'
import { pinia } from './app/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './app/styles/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
