<script lang="ts" setup>
/**
 * 工具类 (Utilities) 示例
 * 展示布局 / 间距 / 颜色 / 排版 / 显示 / 响应式工具类的实际效果。
 */
import DemoBlock from '@/DemoBlock.vue';

defineOptions({ name: 'StylesUtilities' });

const flexCode = `
\`\`\`html
<div class="flex justify-between items-center gap-4">
  <div class="box">左</div>
  <div class="box">中</div>
  <div class="box">右</div>
</div>
\`\`\`
`;

const spacingCode = `
\`\`\`html
<div class="padding-rem bg-primary-light radius-half-rem">padding-rem 内边距</div>
<div class="mt-4 padding-rem bg-success radius-half-rem">mt-4 上外边距</div>
\`\`\`
`;

const colorCode = `
\`\`\`html
<div class="flex gap-4">
  <div class="box bg-primary text-white">bg-primary</div>
  <div class="box bg-success text-white">bg-success</div>
  <div class="box bg-danger text-white">bg-danger</div>
  <div class="box bg-info text-white">bg-info</div>
  <div class="box bg-warning text-white">bg-warning</div>
</div>
<span class="text-muted">text-muted 次要文字</span>
\`\`\`
`;

const typeCode = `
\`\`\`html
<h1 class="text-2xl font-bold text-center">居中加粗标题</h1>
<p class="text-sm text-muted">text-sm text-muted 说明文字</p>
\`\`\`
`;

const displayCode = `
\`\`\`html
<div class="d-flex">display: flex</div>
<div class="position-relative">relative 定位容器</div>
<div class="hidden-768">仅桌面端显示</div>
<div class="show-768">仅移动端显示</div>
\`\`\`
`;
</script>

<template>
  <div class="container-column">
    <DemoBlock title="布局工具类" :code="flexCode">
      <div class="flex justify-between items-center gap-4 w-100">
        <div class="box">左</div>
        <div class="box">中</div>
        <div class="box">右</div>
      </div>
    </DemoBlock>

    <DemoBlock title="间距工具类" :code="spacingCode">
      <div class="container-column gap-4">
        <div class="padding-rem bg-primary-light radius-half-rem">
          padding-rem 内边距
        </div>
        <div class="mt-4 padding-rem bg-success radius-half-rem">
          mt-4 上外边距
        </div>
      </div>
    </DemoBlock>

    <DemoBlock title="颜色工具类" :code="colorCode">
      <div class="container-column gap-4">
        <div class="flex flex-wrap gap-4">
          <div class="box bg-primary text-white">bg-primary</div>
          <div class="box bg-success text-white">bg-success</div>
          <div class="box bg-danger text-white">bg-danger</div>
          <div class="box bg-info text-white">bg-info</div>
          <div class="box bg-warning text-white">bg-warning</div>
        </div>
        <div>
          <span class="text-primary font-semibold">text-primary 主色文字</span>
          <span class="text-muted">text-muted 次要文字</span>
        </div>
      </div>
    </DemoBlock>

    <DemoBlock title="排版工具类" :code="typeCode">
      <div class="container-column gap-4">
        <h1 class="text-2xl font-bold text-center">居中加粗标题</h1>
        <p class="text-sm text-muted text-center">
          text-sm text-muted 说明文字
        </p>
        <p class="text-xl font-light">text-xl font-light 大号细体</p>
      </div>
    </DemoBlock>

    <DemoBlock title="显示 / 响应式" :code="displayCode">
      <div class="container-column gap-4">
        <div class="d-flex gap-4">
          <span
            class="d-inline-block padding-rem bg-primary-light radius-half-rem"
          >
            d-inline-block
          </span>
          <span
            class="d-inline-block padding-rem bg-primary-light radius-half-rem"
          >
            d-inline-block
          </span>
        </div>
        <div class="padding-rem bg-warning radius-half-rem">
          使用浏览器宽度 < 768px 可看到 hidden-768 隐藏、show-768 显示效果
        </div>
      </div>
    </DemoBlock>
  </div>
</template>

<style scoped>
.box {
  min-width: 5rem;
  padding: var(--q-space-4) var(--q-space-6);
  background: var(--q-color-primary-light);
  border: 1px solid var(--q-color-primary);
  border-radius: var(--q-radius-md);
  text-align: center;
}

.w-100 {
  width: 100%;
}
</style>
