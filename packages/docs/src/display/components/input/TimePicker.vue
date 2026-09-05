<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTimePicker } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputTimePicker' });

const time = ref('09:30:00');
const short = ref('18:20');

const code = `
\`\`\`html
<QTimePicker v-model="time" placeholder="请选择时间" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="row">
      <QTimePicker v-model="time" placeholder="HH:mm:ss" />
      <QTimePicker
        v-model="short"
        format="HH:mm"
        placeholder="HH:mm"
        :minute-step="5"
      />
      <QTimePicker placeholder="禁用" disabled />
    </div>
    <p class="tip">当前：{{ time }} / {{ short }}（后者分钟步长 5，无秒列）</p>
  </DemoBlock>
</template>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.tip {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
</style>
