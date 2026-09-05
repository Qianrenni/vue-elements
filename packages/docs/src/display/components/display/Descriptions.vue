<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QDescriptions } from 'qyani-components';

defineOptions({ name: 'DisplayDescriptions' });

const items = [
  { key: 'name', label: '姓名', content: '张三' },
  { key: 'phone', label: '电话', content: '1810000000' },
  { key: 'city', label: '城市', content: '杭州' },
  { key: 'remark', label: '备注', content: 'VIP' },
  {
    key: 'address',
    label: '地址',
    content: '浙江省杭州市西湖区万塘路 18 号',
    span: 2,
  },
];

const verticalItems = [
  { key: 'product', label: '产品', content: '云数据库' },
  { key: 'mode', label: '计费方式', content: '包年包月' },
  { key: 'renew', label: '自动续费', content: '是' },
];

const code = `
\`\`\`html
<QDescriptions title="用户信息" :items="items" />
<QDescriptions
  title="带边框"
  bordered
  :column="3"
  :items="items"
/>
<QDescriptions
  title="垂直"
  layout="vertical"
  bordered
  :column="3"
  :items="verticalItems"
/>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <QDescriptions
      title="用户信息"
      :items="items"
      style="margin-bottom: 24px"
    />
    <QDescriptions
      title="带边框（可编辑操作区）"
      :column="3"
      bordered
      :items="items"
      style="margin-bottom: 24px"
    >
      <template #extra>编辑</template>
    </QDescriptions>
    <QDescriptions
      title="垂直"
      layout="vertical"
      bordered
      :column="3"
      :items="verticalItems"
    />
  </DemoBlock>
</template>
