<script lang="ts" setup>
import DemoBlock from '@/DemoBlock.vue';
import { QTypography } from 'qyani-components';
import { ref } from 'vue';

defineOptions({
  name: 'DisplayBasicTypography',
});

const edited = ref('点击 ✎ 编辑这段文字');
const onEdit = (value: string) => {
  edited.value = value;
};

const code = `
\`\`\`html
<QTypography :level="1">一级标题</QTypography>
<QTypography :level="2">二级标题</QTypography>
<QTypography type="secondary">次要文本</QTypography>
<QTypography type="success">成功文本</QTypography>
<QTypography type="warning">警告文本</QTypography>
<QTypography type="danger">危险文本</QTypography>
<QTypography paragraph>一段说明文字……</QTypography>
<QTypography strong italic underline>组合样式</QTypography>
<QTypography copyable>复制我</QTypography>
<QTypography editable @change="onEdit">{{ edited }}</QTypography>
\`\`\`
`;
</script>

<template>
  <DemoBlock :code="code">
    <div class="container-column gap-5 demo-wrap">
      <QTypography :level="1">一级标题</QTypography>
      <QTypography :level="3">三级标题</QTypography>
      <QTypography paragraph>
        一段正文：QTypography
        提供标题、段落与行内文本的统一样式，支持语义色、组合样式、省略号与复制。
      </QTypography>

      <div class="container-column gap-2">
        <QTypography type="secondary">次要（secondary）</QTypography>
        <QTypography type="success">成功（success）</QTypography>
        <QTypography type="warning">警告（warning）</QTypography>
        <QTypography type="danger">危险（danger）</QTypography>
        <QTypography disabled>禁用/弱化</QTypography>
      </div>

      <div class="container-row gap-4 flex-wrap align-center">
        <QTypography strong>加粗</QTypography>
        <QTypography italic>斜体</QTypography>
        <QTypography underline>下划线</QTypography>
        <QTypography delete>删除线</QTypography>
        <QTypography mark>高亮</QTypography>
        <QTypography code>const a = 1</QTypography>
        <QTypography keyboard>Ctrl + C</QTypography>
      </div>

      <div class="container-row gap-4 flex-wrap align-center">
        <QTypography paragraph :ellipsis="2" class="ellipsis-demo">
          很长的段落内容用于演示多行省略效果，超出两行后会自动截断并显示省略号，方便在卡片/表格等受限空间内使用。
        </QTypography>
        <QTypography copyable>点击右侧图标复制本句</QTypography>
        <QTypography editable @change="onEdit">{{ edited }}</QTypography>
      </div>
    </div>
  </DemoBlock>
</template>

<style scoped>
.demo-wrap {
  width: 100%;
}

.flex-wrap {
  flex-wrap: wrap;
}

.ellipsis-demo {
  width: 260px;
}
</style>
