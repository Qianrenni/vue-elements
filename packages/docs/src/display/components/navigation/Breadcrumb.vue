<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QBreadcrumb } from 'qyani-components';

defineOptions({
  name: 'DisplayNavigationBreadcrumb',
});

const code = `
\`\`\`html
<QBreadcrumb
  :items="[
    { title: '首页' },
    { title: '组件', href: '/components' },
    { title: '导航' },
    { title: 'Breadcrumb' },
  ]"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-6 demo-wrap">
      <QBreadcrumb
        :items="[
          { title: '首页' },
          { title: '组件', href: '/components' },
          { title: '导航' },
          { title: 'Breadcrumb' },
        ]"
      />
      <QBreadcrumb
        :items="[{ title: '首页' }, { title: '设置' }]"
        separator=">"
      />
    </div>
  </DemoBlock>
</template>

<style scoped>
.demo-wrap {
  width: 100%;
}
</style>
