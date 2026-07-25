// main.ts
// 设置 SVG 图标的基础路径，使其在 GitHub Pages 子路径下也能正确加载
import { IconConfig } from 'qyani-components';
import 'qyani-components/dist/style.css';
import { createApp } from 'vue';

import App from './App.vue';
import './private.css';

IconConfig.setBase(import.meta.env.BASE_URL.replace(/\/$/, ''));

const app = createApp(App);
app.mount('#app');
