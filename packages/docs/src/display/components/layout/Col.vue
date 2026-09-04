<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QCol, QRow } from 'qyani-components';

defineOptions({
  name: 'DisplayLayoutCol',
});

const code = `
\`\`\`html
<QRow :gutter="12">
  <QCol :span="6"><div class="cell">6</div></QCol>
  <QCol :span="12"><div class="cell">12</div></QCol>
  <QCol :span="6"><div class="cell">6</div></QCol>
</QRow>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="demo-wrap">
      <QRow :gutter="12">
        <QCol :span="6"><div class="cell">span 6</div></QCol>
        <QCol :span="12"><div class="cell">span 12</div></QCol>
        <QCol :span="6"><div class="cell">span 6</div></QCol>
      </QRow>
    </div>
  </DemoBlock>
</template>

<style scoped>
.demo-wrap {
  width: 100%;
}

.cell {
  padding: var(--q-space-4);
  text-align: center;
  background: var(--q-color-primary-light);
  color: var(--q-color-text);
  border-radius: var(--q-radius-sm);
}
</style>
