<script lang="ts" setup>
import { QScrollNotice } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayScrollNotice',
});

const code = `
\`\`\`html
<!-- 基础用法 -->
<QScrollNotice>
  这是一条滚动通知消息
</QScrollNotice>

<!-- 自定义速度 -->
<QScrollNotice :speed="2">
  更快的滚动速度
</QScrollNotice>

<QScrollNotice :speed="0.5">
  更慢的滚动速度
</QScrollNotice>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6">
      <QScrollNotice>
        这是一条默认的滚动通知消息，用于显示重要提示信息
      </QScrollNotice>
      <QScrollNotice :speed="2">
        这是快速滚动的通知消息，速度为2像素/帧
      </QScrollNotice>
      <QScrollNotice :speed="0.5">
        这是慢速滚动的通知消息，速度为0.5像素/帧
      </QScrollNotice>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
</style>
