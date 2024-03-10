import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from '@/router/index.ts'
import 'reset.css'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.mount('#app')
