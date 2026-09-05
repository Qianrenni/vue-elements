<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QForm, QFormButton, QFormItem } from 'qyani-components';
import { reactive } from 'vue';

defineOptions({
  name: 'DisplayFormQFormItem',
});

const model = reactive({ city: '' });
const rules = {
  city: [{ required: true, message: '请选择城市' }],
};

const code = `
\`\`\`html
<!-- QFormItem 用于 QForm 内部：label / 必填星号 / 错误提示 -->
<QForm :model="model" :rules="{ city: [{ required: true, message: '请选择城市' }] }">
  <QFormItem name="city" label="城市">
    <input v-model="model.city" placeholder="输入城市名（失焦校验）" />
  </QFormItem>
</QForm>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column" style="max-width: 320px">
      <QForm :model="model" :rules="rules" label-width="70px">
        <QFormItem name="city" label="城市" required>
          <input
            v-model="model.city"
            placeholder="输入城市名（失焦校验）"
            style="border: 1px solid #ccc; padding: 4px 8px; width: 100%"
          />
        </QFormItem>
        <div>
          <QFormButton type="submit">提交</QFormButton>
        </div>
      </QForm>
    </div>
  </DemoBlock>
</template>
