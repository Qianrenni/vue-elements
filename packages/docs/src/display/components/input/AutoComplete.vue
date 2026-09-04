<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QAutoComplete } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputAutoComplete' });

const value1 = ref('');
const value2 = ref('');

const addresses = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
  { value: 'Wall Street 2' },
];

const gmail = ['@gmail.com', '@163.com', '@qq.com'];

const code = `
\`\`\`html
<QAutoComplete
  v-model="value"
  :options="options"
  placeholder="输入地址"
  style="width: 280px"
/>

<QAutoComplete
  v-model="value2"
  :options="gmail"
  placeholder="输入 @ 过滤后缀"
  allow-clear
  style="width: 280px"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-10 w-420">
      <QAutoComplete
        v-model="value1"
        :options="addresses"
        placeholder="输入地址搜索（自动完成）"
      />
      <QAutoComplete
        v-model="value2"
        :options="gmail"
        allow-clear
        placeholder="输入 @ 自动补全后缀"
      />
      <div class="q-ac-note">
        当前值：{{ value1 || '(空)' }} / {{ value2 || '(空)' }}
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-420 {
  width: 420px;
  max-width: 100%;
}
.q-ac-note {
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm);
}
</style>
