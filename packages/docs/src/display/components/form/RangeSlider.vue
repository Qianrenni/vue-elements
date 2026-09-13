<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QRangeSlider, type RangeSliderValue } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormRangeSlider',
});

const basicValue = ref<RangeSliderValue>([20, 60]);
const stepValue = ref<RangeSliderValue>([10, 90]);
const plainValue = ref<RangeSliderValue>([30, 80]);
const disabledValue = ref<RangeSliderValue>([30, 70]);
const marksValue = ref<RangeSliderValue>([26, 37]);

const lastChange = ref('');

const temperatureMarks: Record<number, string> = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: '100°C',
};

const onAfterChange = (value: RangeSliderValue) => {
  lastChange.value = value.join(' ~ ');
};

const code = `
\`\`\`html
<!-- 基础区间 -->
<QRangeSlider v-model:value="basicValue" :min="0" :max="100" />

<!-- 步进 + 自定义范围 + 拖动结束回调 -->
<QRangeSlider v-model:value="stepValue" :min="0" :max="100" :step="10" @after-change="onAfterChange" />

<!-- 隐藏数值提示 -->
<QRangeSlider v-model:value="plainValue" :tooltip="false" />

<!-- 禁用 -->
<QRangeSlider v-model:value="disabledValue" disabled />

<!-- 刻度 marks -->
<QRangeSlider
  v-model:value="marksValue"
  :marks="{ 0: '0°C', 26: '26°C', 37: '37°C', 100: '100°C' }"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <div class="container flex-wrap">
        <div class="item">
          <p class="item-label">基础区间</p>
          <QRangeSlider v-model:value="basicValue" :min="0" :max="100" />
        </div>
        <div class="item">
          <p class="item-label">步进 10</p>
          <QRangeSlider
            v-model:value="stepValue"
            :min="0"
            :max="100"
            :step="10"
            @after-change="onAfterChange"
          />
        </div>
        <div class="item">
          <p class="item-label">隐藏数值提示</p>
          <QRangeSlider v-model:value="plainValue" :tooltip="false" />
        </div>
        <div class="item">
          <p class="item-label">禁用</p>
          <QRangeSlider v-model:value="disabledValue" disabled />
        </div>
        <div class="item">
          <p class="item-label">刻度 marks</p>
          <QRangeSlider v-model:value="marksValue" :marks="temperatureMarks" />
        </div>
      </div>
      <p class="tip">
        当前值：{{ basicValue.join(' ~ ') }} / {{ stepValue.join(' ~ ') }} /
        {{ marksValue.join(' ~ ') }}
        <span v-if="lastChange">（拖动结束：{{ lastChange }}）</span>
      </p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.item {
  width: 280px;
  max-width: 100%;
}
.item-label {
  margin: 0 0 8px;
  font-size: 12px;
  color: var(--q-color-text-muted);
}
.tip {
  margin: 0;
  font-size: 12px;
  color: var(--q-color-text-secondary);
}
</style>
