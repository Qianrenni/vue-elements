<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QContent, QLayout, QSider } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutSider' });

const collapsed = ref(false);

const code = `
\`\`\`html
<QLayout style="height: 280px">
  <QSider collapsible v-model:collapsed="collapsed">
    <div class="sider-text">侧边栏菜单</div>
  </QSider>
  <QContent>主体</QContent>
</QLayout>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QLayout class="demo-layout">
      <QSider :width="200" collapsible v-model:collapsed="collapsed">
        <div class="sider-text">侧边栏菜单</div>
      </QSider>
      <QContent>主体</QContent>
    </QLayout>
  </DemoBlock>
</template>

<style scoped>
.demo-layout {
  height: 280px;
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  overflow: hidden;
}
.sider-text {
  padding: 12px 16px;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
}
</style>
