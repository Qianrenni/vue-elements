<script lang="ts" setup>
import { QBadge } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';

defineOptions({
  name: 'DisplayBadge',
});

const code = `
\`\`\`html
<!-- 基础用法 -->
<QBadge :value="10">
  <button>消息</button>
</QBadge>

<!-- 不同类型 -->
<QBadge type="success" :value="5">成功</QBadge>
<QBadge type="danger" :value="99">危险</QBadge>

<!-- 点状徽章 -->
<QBadge dot>
  <button>通知</button>
</QBadge>

<!-- 超过最大值 -->
<QBadge :value="100" :max="99">
  <button>大量</button>
</QBadge>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-8">
      <div class="container gap-8 items-center">
        <QBadge :value="10">
          <button class="button-outline">消息</button>
        </QBadge>
        <QBadge type="success" :value="5">
          <button class="button-outline">成功</button>
        </QBadge>
        <QBadge type="danger" :value="99">
          <button class="button-outline">危险</button>
        </QBadge>
        <QBadge type="warning" :value="3">
          <button class="button-outline">警告</button>
        </QBadge>
      </div>
      <div class="container gap-8 items-center">
        <QBadge dot>
          <button class="button-outline">点状</button>
        </QBadge>
        <QBadge :value="100" :max="99">
          <button class="button-outline">99+</button>
        </QBadge>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-8 {
  gap: 2rem;
}
.items-center {
  align-items: center;
}
</style>
