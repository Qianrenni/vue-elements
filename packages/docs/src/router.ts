import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';

/**
 * 文档站路由（hash 模式）
 * - GitHub Pages 为静态托管，无法配置服务端重写；hash 模式保证任意 URL（含直接访问组件页）可访问
 * - App.vue 是单页布局（无 router-view），通过 useRoute 读取 /c/:name 参数决定当前展示的组件
 */
export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: App },
    { path: '/c/:name', name: 'component', component: App },
  ],
});
