<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QDatePicker } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormDatePicker',
});

const dateValue = ref('2026-09-13');
const monthValue = ref('2026-09');
const datetimeValue = ref('');
const disabledValue = ref('2026-01-01');
const errorValue = ref('');

const code = `
\`\`\`html
<!-- 日期粒度，支持清除 -->
<QDatePicker v-model:value="dateValue" allow-clear placeholder="请选择日期" />

<!-- 月粒度 -->
<QDatePicker v-model:value="monthValue" picker="month" placeholder="请选择月份" />

<!-- 日期 + 时间 -->
<QDatePicker v-model:value="datetimeValue" show-time placeholder="请选择日期时间" />

<!-- 禁用 -->
<QDatePicker v-model:value="disabledValue" disabled />

<!-- 错误态 + 大尺寸 -->
<QDatePicker v-model:value="errorValue" status="error" size="large" placeholder="校验错误" />
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column">
      <div class="container flex-wrap">
        <div class="item">
          <p class="item-label">日期（可清除）</p>
          <QDatePicker
            v-model:value="dateValue"
            allow-clear
            placeholder="请选择日期"
          />
        </div>
        <div class="item">
          <p class="item-label">月粒度</p>
          <QDatePicker
            v-model:value="monthValue"
            picker="month"
            placeholder="请选择月份"
          />
        </div>
        <div class="item">
          <p class="item-label">日期 + 时间</p>
          <QDatePicker
            v-model:value="datetimeValue"
            show-time
            placeholder="请选择日期时间"
          />
        </div>
        <div class="item">
          <p class="item-label">禁用</p>
          <QDatePicker v-model:value="disabledValue" disabled />
        </div>
        <div class="item">
          <p class="item-label">错误态 / 大尺寸</p>
          <QDatePicker
            v-model:value="errorValue"
            status="error"
            size="large"
            placeholder="校验错误"
          />
        </div>
      </div>
      <p class="tip">
        当前值：{{ dateValue || '未选择' }} / {{ monthValue || '未选择' }} /
        {{ datetimeValue || '未选择' }}
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
