// test/main.ts
import {createApp} from 'vue'
import Test from './Test.vue'
import '/src/style/common.css'

const app = createApp(Test)

app.mount('#app')
