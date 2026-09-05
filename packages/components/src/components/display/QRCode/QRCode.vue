<!--
 * @component QQRCode
 * @description 二维码：输入文本/链接生成可扫描二维码，支持尺寸/颜色/纠错等级/中心图标，对齐 Ant Design QRCode 常用能力。
 -->
<template>
  <svg
    :aria-label="'二维码'"
    :height="pixelSize"
    :viewBox="`0 0 ${viewSize} ${viewSize}`"
    :width="pixelSize"
    class="q-qrcode"
    role="img"
    :style="{ backgroundColor: bgColorValue }"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path v-if="modules" :d="pathD" :fill="colorValue" fill-rule="evenodd" />
    <g v-if="hasIcon && iconBox.w > 0">
      <rect
        :fill="bgColorValue"
        :height="iconBox.w + 2 * iconGap"
        :rx="iconRadius"
        :width="iconBox.w + 2 * iconGap"
        :x="iconBox.x - iconGap"
        :y="iconBox.y - iconGap"
      />
      <image
        :height="iconBox.w"
        :href="icon"
        :width="iconBox.w"
        :x="iconBox.x"
        :y="iconBox.y"
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useQQRCode } from './composable';
import type { QQRCodeProps } from './type';

defineOptions({ name: 'QQRCode' });

const props = withDefaults(defineProps<QQRCodeProps>(), {
  value: '',
  size: 160,
  color: '#000000',
  bgColor: '#ffffff',
  errorLevel: 'M',
  padding: 4,
  icon: '',
  iconSize: undefined,
});

const { modules, pathD, viewSize, pixelSize, hasIcon, iconBox } =
  useQQRCode(props);

const colorValue = computed(() => props.color || '#000000');
const bgColorValue = computed(() => props.bgColor || '#ffffff');

/** 图标与背景的留白（模块坐标） */
const iconGap = computed(() => Math.max(0.5, iconBox.value.w * 0.18));
/** 图标背景圆角 */
const iconRadius = computed(() =>
  Math.max(1, (iconBox.value.w + 2 * iconGap.value) * 0.16),
);
</script>

<style scoped>
.q-qrcode {
  display: inline-block;
  line-height: 0;
  vertical-align: middle;
}
</style>
