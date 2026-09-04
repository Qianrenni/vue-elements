<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QSegmented } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplaySegmented',
});

const value = ref('day');
const align = ref('center');
const opts = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
  { label: '月', value: 'month' },
];

const code = `
\`\`\`html
<QSegmented v-model="value" :options="['日', '周', '月']" />
<QSegmented
  v-model="align"
  :options="[
    { label: '左', value: 'left', icon: 'Menu' },
    { label: '中', value: 'center' },
    { label: '右', value: 'right', icon: 'More', disabled: true },
  ]"
/>
<QSegmented :options="opts" block size="large" />
<QSegmented :options="opts" vertical />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="seg-col">
      <div class="seg-row">
        <span>基础：</span>
        <QSegmented v-model="value" :options="['日', '周', '月']" />
        <span class="val">当前：{{ value }}</span>
      </div>
      <div class="seg-row">
        <span>图标+禁用：</span>
        <QSegmented
          v-model="align"
          :options="[
            { label: '左', value: 'left', icon: 'Menu' },
            { label: '中', value: 'center' },
            { label: '右', value: 'right', icon: 'More', disabled: true },
          ]"
        />
      </div>
      <div class="seg-row">
        <span>撑满整行（block + large）：</span>
      </div>
      <QSegmented :options="opts" block size="large" />
      <div class="seg-row seg-row--top">
        <span>纵向：</span>
        <QSegmented :options="opts" vertical />
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.seg-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.seg-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.seg-row--top {
  align-items: flex-start;
}
.seg-row .val {
  color: var(--q-color-text-muted);
  font-size: 12px;
}
</style>
