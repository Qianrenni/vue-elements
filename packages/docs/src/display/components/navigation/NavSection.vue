<script lang="ts" setup>
import { QNavSection } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayNavigationNavSection' });

const sections = [
  { label: '首页', value: 'home' },
  { label: '产品', value: 'products' },
  { label: '关于', value: 'about' },
];

const handleSelect = (section: any) => {
  console.log('选中:', section);
};

const code = `
\`\`\`html
<template>
  <QNavSection 
    :sections="sections"
    title="导航"
    @select="handleSelect"
  />
</template>

<script setup>
const sections = [
  { label: '首页', value: 'home' },
  { label: '产品', value: 'products' },
];
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="w-300">
      <QNavSection
        :sections="sections"
        title="示例导航"
        @select="handleSelect"
      />
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-300 {
  width: 300px;
}
</style>
