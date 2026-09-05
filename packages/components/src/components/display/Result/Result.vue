<!--
 * @component QResult
 * @description 结果页：用于展示操作结果（成功/失败/异常等状态），支持标题、副标题、自定义内容与操作区，对齐 Ant Design Result 常用能力。
 -->
<template>
  <div class="q-result" :class="`q-result--${status}`">
    <div class="q-result-icon">
      <slot name="icon">
        <span
          v-if="!isHttp"
          class="q-result-glyph"
          :class="`q-result-glyph--${status}`"
          aria-hidden="true"
        >
          {{ glyph }}
        </span>
        <span v-else class="q-result-code" aria-hidden="true">{{
          status
        }}</span>
      </slot>
    </div>

    <div v-if="title || $slots.title" class="q-result-title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div v-if="subTitle || $slots.subTitle" class="q-result-subtitle">
      <slot name="subTitle">{{ subTitle }}</slot>
    </div>

    <div v-if="$slots.default" class="q-result-content">
      <slot />
    </div>

    <div v-if="$slots.extra" class="q-result-extra">
      <slot name="extra" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQResult } from './composable';
import type { QResultProps } from './type';

defineOptions({ name: 'QResult' });

const props = withDefaults(defineProps<QResultProps>(), {
  status: 'info',
  title: '',
  subTitle: '',
});

const { status, glyph, isHttp } = useQResult(props);
</script>

<style scoped>
.q-result {
  box-sizing: border-box;
  padding: var(--q-space-8, 32px);
  text-align: center;
  color: var(--q-color-text);
}
.q-result-icon {
  margin-bottom: var(--q-space-4, 16px);
  display: flex;
  justify-content: center;
}
.q-result-glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  color: #fff;
  font-size: 40px;
  font-weight: var(--q-font-weight-semibold, 600);
  font-style: normal;
  user-select: none;
}
.q-result-glyph--success {
  background: var(--q-color-green-400);
}
.q-result-glyph--error {
  background: var(--q-color-red-400);
}
.q-result-glyph--info {
  background: var(--q-color-blue-400);
}
.q-result-glyph--warning {
  background: var(--q-color-orange-300);
}

/* HTTP 码大号图形 */
.q-result-code {
  font-size: 96px;
  font-weight: var(--q-font-weight-semibold, 600);
  line-height: 1;
  color: var(--q-color-gray-300);
  letter-spacing: 6px;
  user-select: none;
}

.q-result-title {
  font-size: var(--q-font-size-3xl, 24px);
  font-weight: var(--q-font-weight-semibold, 600);
  color: var(--q-color-text);
}
.q-result-subtitle {
  margin-top: var(--q-space-3, 12px);
  font-size: var(--q-font-size-sm, 14px);
  color: var(--q-color-text-secondary);
}
.q-result-content {
  margin-top: var(--q-space-4, 16px);
}
.q-result-extra {
  margin-top: var(--q-space-6, 24px);
}
</style>
