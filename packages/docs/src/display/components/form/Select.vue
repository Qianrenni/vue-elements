<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QSelect } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormSelect',
});

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '西瓜', value: 'watermelon', disabled: true },
];

const basicValue = ref<string>('apple');
const multipleValue = ref<string[]>(['apple', 'banana']);
const searchValue = ref<string>();
const disabledValue = ref<string>('orange');

const code = `
\`\`\`html
<!-- 基础单选，支持清除 -->
<QSelect v-model:value="basicValue" :options="options" allow-clear placeholder="请选择水果" />

<!-- 多选 -->
<QSelect v-model:value="multipleValue" :options="options" mode="multiple" placeholder="可多选" />

<!-- 可搜索 -->
<QSelect v-model:value="searchValue" :options="options" show-search placeholder="输入关键字搜索" />

<!-- 禁用（列表中含 disabled 选项） -->
<QSelect v-model:value="disabledValue" :options="options" disabled />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <div class="container flex-wrap">
        <div class="item">
          <p class="item-label">基础单选 / 可清除</p>
          <QSelect
            v-model:value="basicValue"
            :options="options"
            allow-clear
            placeholder="请选择水果"
          />
        </div>
        <div class="item">
          <p class="item-label">多选</p>
          <QSelect
            v-model:value="multipleValue"
            :options="options"
            mode="multiple"
            placeholder="可多选"
          />
        </div>
        <div class="item">
          <p class="item-label">可搜索</p>
          <QSelect
            v-model:value="searchValue"
            :options="options"
            show-search
            placeholder="输入关键字搜索"
          />
        </div>
        <div class="item">
          <p class="item-label">禁用</p>
          <QSelect v-model:value="disabledValue" :options="options" disabled />
        </div>
      </div>
      <p class="tip">
        当前值：{{ basicValue }} / {{ multipleValue.join('、') }} /
        {{ searchValue || '未选择' }}
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
