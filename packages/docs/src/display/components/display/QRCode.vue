<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QQRCode } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayQRCode' });

const value = 'https://qianrenni.github.io/vue-elements/';
const input = ref(value);

const code = `
\`\`\`html
<QQRCode :value="value" :size="160" />
<QQRCode
  :value="value"
  :size="160"
  color="#8c5a2b"
  error-level="H"
/>
<QQRCode :value="value" :size="120" :padding="2" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="row">
      <QQRCode :value="value" :size="160" />
      <QQRCode :value="value" :size="160" color="#8c5a2b" error-level="H" />
      <QQRCode :value="value" :size="120" :padding="2" />
    </div>
    <div class="tip-row">
      <label class="tip-label" for="qr-input">试试改内容：</label>
      <input
        id="qr-input"
        v-model="input"
        class="tip-input"
        placeholder="输入文本或链接"
      />
      <div v-if="input.trim()" class="qr-mini">
        <QQRCode :value="input" :size="96" />
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.row {
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  align-items: center;
}
.tip-row {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.tip-label {
  font-size: 13px;
  color: var(--q-color-text-secondary);
}
.tip-input {
  padding: 6px 10px;
  border: 1px solid var(--q-color-border-light);
  border-radius: 6px;
  min-width: 220px;
}
.qr-mini {
  padding: 6px;
  border: 1px solid var(--q-color-gray-200);
  border-radius: 6px;
}
</style>
