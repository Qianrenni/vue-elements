import { createApp } from "vue";
import App from './App.vue'
import './src/style/common.css'
import QyaniComponents from './src'


const app=createApp(App)
app.use(QyaniComponents)
app.mount('#app')
