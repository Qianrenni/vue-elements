<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'DisplayLayoutCollapseItem' });

const code = `
\`\`\`html
<template>
  <QCollapse v-model="activeNames">
    <QCollapseItem name="1" title="标题">
      <p>折叠项的内容</p>
    </QCollapseItem>
  </QCollapse>
</template>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="w-400">
      <p>CollapseItem 是 Collapse 的子组件，请参考 Collapse 组件的完整示例。</p>
    </div>
  </DemoBlock>
</template>

<style scoped>
.w-400 {
  width: 400px;
}
</style>
