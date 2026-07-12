<script lang="ts" setup>
import { QNavSection, type NavSectionProps } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayNavigationNavSection' });

const sections: NavSectionProps[] = [
  {
    title: '首页',
    value: 'home',
    children: [
      { title: '首页1', value: 'home1' },
      { title: '首页2', value: 'home2' },
    ],
  },
  { title: '产品', value: 'products' },
  { title: '关于', value: 'about' },
];

const handleSelect = (section: NavSectionProps) => {
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
  { title: '首页', value: 'home' },
  { title: '产品', value: 'products' },
];
<\\/script>
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
