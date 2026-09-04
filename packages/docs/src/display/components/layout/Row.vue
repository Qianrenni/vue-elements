<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QCol, QRow } from 'qyani-components';

defineOptions({
  name: 'DisplayLayoutRow',
});

const code = `
\`\`\`html
<QRow :gutter="16">
  <QCol :span="8"><div class="cell">8</div></QCol>
  <QCol :span="8"><div class="cell">8</div></QCol>
  <QCol :span="8"><div class="cell">8</div></QCol>
</QRow>

<QRow :gutter="[16, 12]" justify="center">
  <QCol :span="6"><div class="cell">6</div></QCol>
  <QCol :span="6" :offset="2"><div class="cell">6 + offset 2</div></QCol>
</QRow>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 demo-wrap">
      <QRow :gutter="16">
        <QCol v-for="n in 3" :key="n" :span="8">
          <div class="cell">col-8</div>
        </QCol>
      </QRow>

      <QRow :gutter="[16, 12]" justify="center">
        <QCol :span="6"><div class="cell">6</div></QCol>
        <QCol :span="6" :offset="2"><div class="cell">6 + offset 2</div></QCol>
      </QRow>

      <QRow justify="space-between">
        <QCol :span="5"><div class="cell">5</div></QCol>
        <QCol :span="5"><div class="cell">5</div></QCol>
        <QCol :span="5"><div class="cell">5</div></QCol>
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
