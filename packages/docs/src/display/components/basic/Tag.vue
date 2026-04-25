<script lang="ts" setup>
import { QTag } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayBasicTag',
});

const tags = [
  { text: '默认标签', color: 'white', background: 'var(--tag-primary-color)' },
  { text: '成功标签', color: 'white', background: '#52c41a' },
  { text: '警告标签', color: 'white', background: '#faad14' },
  { text: '危险标签', color: 'white', background: '#ff4d4f' },
  { text: '信息标签', color: 'white', background: '#1890ff' },
];

const code = `
\`\`\`html
<QTag text="默认标签" />
<QTag text="成功标签" background="#52c41a" />
<QTag text="自定义" color="#fff" background="#722ed1" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container gap-4 flex-wrap">
      <QTag v-for="(tag, index) in tags" :key="index" v-bind="tag" />
      <QTag text="自定义标签" color="#fff" background="#722ed1" />
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
.flex-wrap {
  flex-wrap: wrap;
}
</style>
