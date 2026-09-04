<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QSlider } from 'qyani-components';
import { ref } from 'vue';

defineOptions({ name: 'DisplayInputSlider' });

const v1 = ref(30);
const v2 = ref(60);

const code = `
\`\`\`html
<QSlider v-model="value" :min="0" :max="100" :step="5" />

<QSlider
  v-model="value"
  :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-10 w-420">
      <QSlider v-model="v1" :min="0" :max="100" :step="5" />
      <QSlider
        v-model="v2"
        :marks="{ 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }"
      />
      <div class="q-slider-note">当前值：{{ v1 }} / {{ v2 }}</div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-420 {
  width: 420px;
  max-width: 100%;
}
.q-slider-note {
  color: var(--q-color-text-secondary);
  font-size: var(--q-font-size-sm);
}
</style>
