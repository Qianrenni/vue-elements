<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QSwitch, useMessage } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormSwitch',
});

const basicValue = ref(false);
const textValue = ref(true);
const sizeValue = ref(false);
const disabledValue = ref(true);
const loadingValue = ref(false);

const onChange = (value: boolean) => {
  useMessage.info(`开关状态：${value ? '开' : '关'}`);
};

const code = `
\`\`\`html
<!-- 基础用法 -->
<QSwitch v-model:value="basicValue" />

<!-- 内外文字 -->
<QSwitch v-model:value="textValue" checked-children="开" un-checked-children="关" />

<!-- 尺寸：small / default -->
<QSwitch v-model:value="sizeValue" size="small" />
<QSwitch v-model:value="sizeValue" size="default" />

<!-- 禁用 -->
<QSwitch v-model:value="disabledValue" disabled />

<!-- 加载中（不可切换） -->
<QSwitch v-model:value="loadingValue" loading />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-4" style="max-width: 420px">
      <div class="container flex-wrap">
        <QSwitch v-model:value="basicValue" @change="onChange" />
      </div>
      <div class="container flex-wrap">
        <QSwitch
          v-model:value="textValue"
          checked-children="开"
          un-checked-children="关"
        />
      </div>
      <div class="container flex-wrap">
        <QSwitch v-model:value="sizeValue" size="small" />
        <QSwitch v-model:value="sizeValue" size="default" />
      </div>
      <div class="container flex-wrap">
        <QSwitch v-model:value="disabledValue" disabled />
        <QSwitch v-model:value="loadingValue" loading />
      </div>
    </div>
  </DemoBlock>
</template>
