// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import 'qyani-components/dist/style.css';
import './private.css';
import qyaniComponents from 'qyani-components';
const app = createApp(App);

app.use(qyaniComponents);
app.mount('#app');
