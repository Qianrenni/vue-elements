<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { type ColorPickerPreset, QColorPicker } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormColorPicker',
});

const presets: ColorPickerPreset[] = [
  { label: '推荐', colors: ['#1677ff', '#52c41a', '#faad14', '#f5222d'] },
  { label: '中性', colors: ['#000000', '#595959', '#bfbfbf', '#ffffff'] },
];

const basicColor = ref('#1677ff');
const presetColor = ref('#52c41a');
const rgbColor = ref('#faad14');
const disabledColor = ref('#f5222d');

const code = `
\`\`\`html
<!-- 基础色块 + 显示色值文本 -->
<QColorPicker v-model:value="basicColor" show-text allow-clear />

<!-- 预设色板 -->
<QColorPicker v-model:value="presetColor" :presets="presets" show-text />

<!-- rgb 文案 + 错误态 -->
<QColorPicker v-model:value="rgbColor" format="rgb" show-text status="error" />

<!-- 禁用 -->
<QColorPicker v-model:value="disabledColor" show-text disabled />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <div class="container flex-wrap">
        <div class="item">
          <p class="item-label">基础 / 可清除 / 显示色值</p>
          <QColorPicker v-model:value="basicColor" show-text allow-clear />
        </div>
        <div class="item">
          <p class="item-label">预设色板</p>
          <QColorPicker
            v-model:value="presetColor"
            :presets="presets"
            show-text
          />
        </div>
        <div class="item">
          <p class="item-label">rgb 文案 / 错误态</p>
          <QColorPicker
            v-model:value="rgbColor"
            format="rgb"
            show-text
            status="error"
          />
        </div>
        <div class="item">
          <p class="item-label">禁用</p>
          <QColorPicker v-model:value="disabledColor" show-text disabled />
        </div>
      </div>
      <p class="tip">
        当前值：{{ basicColor }} / {{ presetColor }} / {{ rgbColor }}
      </p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.item {
  width: 240px;
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
