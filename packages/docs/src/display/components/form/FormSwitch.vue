<script lang="ts" setup>
import { QFormSwitch } from 'qyani-components';
import DemoBlock from '@/DemoBlock.vue';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayFormSwitch',
});

const switchValue1 = ref(false);
const switchValue2 = ref(true);
const switchValue3 = ref(false);

const code = `
\`\`\`html
<template>
  <!-- 基础开关 -->
  <QFormSwitch v-model="switchValue1" />

  <!-- 带标签的开关 -->
  <QFormSwitch v-model="switchValue2" label="启用通知" />

  <!-- 不同尺寸 -->
  <QFormSwitch v-model="switchValue3" size="small" />
  <QFormSwitch v-model="switchValue3" size="middle" />
  <QFormSwitch v-model="switchValue3" size="large" />
</template>

<script setup>
import { ref } from 'vue';
const switchValue = ref(false);
<\/script>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6">
      <div class="container gap-8 items-center">
        <QFormSwitch v-model="switchValue1" />
        <span>关闭状态</span>
      </div>
      <div class="container gap-8 items-center">
        <QFormSwitch v-model="switchValue2" label="启用通知" />
      </div>
      <div class="container gap-8 items-center">
        <QFormSwitch v-model="switchValue3" size="small" />
        <span>小</span>
        <QFormSwitch v-model="switchValue3" size="middle" />
        <span>中</span>
        <QFormSwitch v-model="switchValue3" size="large" />
        <span>大</span>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.gap-6 {
  gap: 1.5rem;
}
.gap-8 {
  gap: 2rem;
}
.items-center {
  align-items: center;
}
</style>
