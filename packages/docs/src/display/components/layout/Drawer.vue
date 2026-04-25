<script lang="ts" setup>
import { QDrawer, QFormButton } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({ name: 'DisplayLayoutDrawer' });

const drawerVisible = ref(false);

const code = `
\`\`\`html
<template>
  <QFormButton @click="drawerVisible = true">打开抽屉</QFormButton>
  <QDrawer v-model:visible="drawerVisible" title="抽屉标题">
    <p>抽屉内容</p>
  </QDrawer>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6">
      <QFormButton @click="drawerVisible = true">打开右侧抽屉</QFormButton>
      <QDrawer v-model:visible="drawerVisible" title="示例抽屉">
        <p>这是抽屉的内容区域。</p>
        <p>抽屉可以从上下左右四个方向滑出。</p>
      </QDrawer>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
</style>
