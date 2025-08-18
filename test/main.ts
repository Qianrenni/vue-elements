// test/main.ts
import {createApp} from 'vue'
import Test from './Docs.vue'
import '/src/style/common.css'

const app = createApp(Test)

app.mount('#app')
