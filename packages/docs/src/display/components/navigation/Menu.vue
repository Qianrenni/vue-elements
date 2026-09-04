<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QMenu } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayNavigationMenu' });

const items = [
  {
    key: 'nav',
    label: '导航',
    children: [
      { key: 'menu', label: '菜单' },
      { key: 'dropdown', label: '下拉菜单' },
      { key: 'anchor', label: '锚点' },
    ],
  },
  { key: 'components', label: '组件' },
  { key: 'utils', label: '工具函数' },
  { key: 'danger', label: '危险操作', danger: true },
];

const inlineSelected = ref<string[]>(['components']);
const inlineOpen = ref<string[]>(['nav']);
const horizSelected = ref<string[]>(['components']);

const code = `
\`\`\`html
<QMenu
  mode="inline"
  :items="items"
  v-model:selectedKeys="selected"
  v-model:openKeys="open"
/>

<QMenu mode="horizontal" :items="items" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8">
      <div class="menu-box">
        <QMenu
          mode="inline"
          :items="items"
          v-model:selectedKeys="inlineSelected"
          v-model:openKeys="inlineOpen"
        />
      </div>
      <div class="menu-box">
        <QMenu
          mode="horizontal"
          :items="items"
          v-model:selectedKeys="horizSelected"
        />
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.menu-box {
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  overflow: hidden;
}
</style>
