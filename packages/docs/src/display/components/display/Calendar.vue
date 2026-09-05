<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QCalendar } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayDisplayCalendar' });

const value = ref<Date | null>(new Date());
const fmt = (d: Date | null) =>
  d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : '—';
const disabled = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

const code = `
\`\`\`html
<QCalendar v-model="value" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QCalendar v-model="value" :disabled-date="disabled" />
    <p class="tip">选中：{{ fmt(value) }}（默认周六日禁用，可点“今天”）</p>
  </DemoBlock>
</template>

<style scoped>
.tip {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
</style>
