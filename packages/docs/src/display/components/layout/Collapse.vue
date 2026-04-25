<script lang="ts" setup>
import { QCollapse, QCollapseItem } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutCollapse' });

const activeNames = ref<string[]>(['1']);

const code = `
\`\`\`html
<template>
  <QCollapse v-model="activeNames">
    <QCollapseItem name="1" title="面板1">内容1</QCollapseItem>
    <QCollapseItem name="2" title="面板2">内容2</QCollapseItem>
  </QCollapse>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="w-400">
      <QCollapse v-model="activeNames">
        <QCollapseItem name="1" title="面板一">
          <p>这是面板一的内容</p>
        </QCollapseItem>
        <QCollapseItem name="2" title="面板二">
          <p>这是面板二的内容</p>
        </QCollapseItem>
        <QCollapseItem name="3" title="面板三">
          <p>这是面板三的内容</p>
        </QCollapseItem>
      </QCollapse>
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-400 {
  width: 400px;
}
</style>
