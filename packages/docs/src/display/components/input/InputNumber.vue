<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QInputNumber } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputInputNumber' });

const v1 = ref<number | null>(20);
const v2 = ref<number | null>(0);

const code = `
\`\`\`html
<QInputNumber v-model="value" :min="0" :max="100" :step="5" />
<QInputNumber v-model="value" :precision="2" size="large" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-320">
      <QInputNumber v-model="v1" :min="0" :max="100" :step="5" />
      <QInputNumber v-model="v2" :precision="2" :step="0.5" size="large" />
      <div class="q-input-note">当前值：{{ v1 }} / {{ v2 }}</div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-320 {
  width: 320px;
}
.q-input-note {
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm);
}
</style>
