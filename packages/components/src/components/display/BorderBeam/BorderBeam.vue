<!--
 * @component QBorderBeam
 * @description 边框流光（对齐 antd BorderBeam 🆕6.4）：沿容器边框移动的装饰光束。包裹任意内容，自身不产生边框；容器圆角通过 style/class 设置后 layer 自动 border-radius:inherit。
 -->
<script lang="ts" setup>
import { computed } from 'vue';
import type { CSSProperties } from 'vue';

import { deriveBorderBeam } from './composable';
import type { QBorderBeamProps } from './type';

defineOptions({ name: 'QBorderBeam' });

const props = withDefaults(defineProps<QBorderBeamProps>(), {
  color: undefined,
  count: undefined,
  duration: undefined,
  size: undefined,
  lineWidth: undefined,
  outset: undefined,
  hover: false,
});

const derived = deriveBorderBeam(props);

const layerStyle = computed<CSSProperties>(() => {
  const outset = derived.outset === '0px' ? '0px' : `-${derived.outset}`;
  return {
    inset: outset,
    padding: derived.lineWidth,
  };
});

const spinStyle = computed<CSSProperties>(() => ({
  background: derived.gradient,
  animationDuration: `${derived.duration}s`,
}));
</script>

<template>
  <div class="q-border-beam" :class="{ 'q-border-beam--hover': hover }">
    <div class="q-border-beam__content">
      <slot />
    </div>
    <div class="q-border-beam__layer" :style="layerStyle" aria-hidden="true">
      <span class="q-border-beam__spin" :style="spinStyle" />
    </div>
  </div>
</template>

<style>
.q-border-beam {
  position: relative;
}
.q-border-beam__content {
  position: relative;
  z-index: 0;
}
.q-border-beam__layer {
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
  overflow: hidden;
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
}
.q-border-beam--hover .q-border-beam__layer {
  opacity: 0;
  transition: opacity 0.25s ease;
}
.q-border-beam--hover:hover .q-border-beam__layer {
  opacity: 1;
}
.q-border-beam__spin {
  position: absolute;
  inset: 0;
  animation: q-bb-spin linear infinite;
  will-change: --q-bb-angle;
}
@property --q-bb-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
@keyframes q-bb-spin {
  from {
    --q-bb-angle: 0deg;
  }
  to {
    --q-bb-angle: 360deg;
  }
}
@media (prefers-reduced-motion: reduce) {
  .q-border-beam__spin {
    animation: none;
  }
  .q-border-beam__layer {
    opacity: 0;
  }
}
</style>
