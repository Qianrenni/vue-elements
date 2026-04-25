<script lang="ts" setup>
import { QFormRangeSlider } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormRangeSlider',
});

const rangeValue = ref(50);
const customRange = ref(25);

const code = `
\`\`\`html
<template>
  <!-- 基础范围滑块 -->
  <QFormRangeSlider 
    v-model="rangeValue"
    name="range"
    :min="0"
    :max="100"
    label="音量"
  />

  <!-- 自定义步长 -->
  <QFormRangeSlider 
    v-model="customRange"
    name="custom"
    :min="0"
    :max="100"
    :step="10"
    label="亮度"
  />
</template>

<script setup>
import { ref } from 'vue';
const rangeValue = ref(50);
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 w-400">
      <QFormRangeSlider
        v-model="rangeValue"
        name="volume"
        :min="0"
        :max="100"
        label="音量"
      />
      <p>当前值: {{ rangeValue }}</p>

      <QFormRangeSlider
        v-model="customRange"
        name="brightness"
        :min="0"
        :max="100"
        :step="10"
        label="亮度"
      />
      <p>当前值: {{ customRange }}</p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.w-400 {
  width: 400px;
}
</style>
