<script lang="ts" setup>
import { QTab } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayNavigationTab' });

const tabList = ['标签一', '标签二', '标签三'];

const handleSelect = (index: number) => {
  console.log('选中索引:', index);
};

const code = `
\`\`\`html
<template>
  <QTab 
    :list="['标签一', '标签二', '标签三']"
    @select="handleSelect"
  />
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-400">
      <QTab :list="tabList" @select="handleSelect" />
      <p>点击标签页切换内容</p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.w-400 {
  width: 400px;
}
</style>
