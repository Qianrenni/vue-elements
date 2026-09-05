<!--
 * @component QConfigProvider
 * @description 全局化配置容器（对标 antd ConfigProvider）：将 componentSize / direction / CSS 变量覆盖等配置通过 provide 注入子树，并以 display:contents 包裹不破坏布局；cssVars 可实现局部主题定制。
 -->
<script lang="ts" setup>
import { computed, watch } from 'vue';
import type { CSSProperties } from 'vue';

import {
  DEFAULT_COMPONENT_SIZE,
  DEFAULT_DIRECTION,
  provideQConfig,
  useQConfigProvider,
} from './composable';
import type { QConfigProviderProps } from './type';

defineOptions({ name: 'QConfigProvider' });

const props = withDefaults(defineProps<QConfigProviderProps>(), {
  componentSize: DEFAULT_COMPONENT_SIZE,
  direction: DEFAULT_DIRECTION,
  cssVars: () => ({}),
  getPopupContainer: undefined,
  renderEmpty: undefined,
});

const { componentSize, direction, sizeClassName, context } =
  useQConfigProvider(props);

// 父级响应式更新时同步进 provide 的上下文
watch(
  () => props.componentSize,
  (value) => {
    componentSize.value = value ?? DEFAULT_COMPONENT_SIZE;
  },
);
watch(
  () => props.direction,
  (value) => {
    direction.value = value ?? DEFAULT_DIRECTION;
  },
);
watch(
  () => props.getPopupContainer,
  (value) => {
    context.getPopupContainer = value;
  },
);
watch(
  () => props.renderEmpty,
  (value) => {
    context.renderEmpty = value;
  },
);

provideQConfig(context);

const cssVarsStyle = computed<CSSProperties>(
  () => props.cssVars as CSSProperties,
);
</script>

<template>
  <div
    :class="['q-config-provider', sizeClassName]"
    :dir="direction"
    :style="cssVarsStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
/* display:contents 包裹不产生布局盒子，同时保留 CSS 变量 / dir 向子树的继承 */
.q-config-provider {
  display: contents;
}
</style>
