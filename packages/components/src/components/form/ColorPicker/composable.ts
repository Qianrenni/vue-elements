import { computed, ref } from 'vue';
import type { ComputedRef, WritableComputedRef } from 'vue';

import type { ColorPickerFormat, QColorPickerProps } from './type';

/** useColorPicker 返回值接口 */
export interface UseColorPickerReturn {
  /** 当前颜色，默认 '#000000' */
  color: ComputedRef<string>;
  /** 是否展示清除按钮 */
  showClear: ComputedRef<boolean>;
  /** 面板展开状态（可写，用于内部开合） */
  isOpen: WritableComputedRef<boolean>;
  /** 按 format 生成的展示文案 */
  text: ComputedRef<string>;
  /** 状态修饰类 */
  statusClass: ComputedRef<string>;
}

/** 颜色缺省值 */
const DEFAULT_COLOR = '#000000';

/** 解析 hex 为 RGB 三元组，非法值返回 null（支持 #rgb 与 #rrggbb） */
function parseHex(value: string): [number, number, number] | null {
  const hex = value.trim().replace(/^#/, '');
  if (!/^(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex)) return null;
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((char) => char + char)
          .join('')
      : hex;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** RGB → hsl 文案 */
function toHslText([r, g, b]: [number, number, number]): string {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;
  const lightness = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;
  if (delta !== 0) {
    if (max === red) hue = ((green - blue) / delta) % 6;
    else if (max === green) hue = (blue - red) / delta + 2;
    else hue = (red - green) / delta + 4;
    hue *= 60;
    if (hue < 0) hue += 360;
  }
  return `hsl(${Math.round(hue)}, ${Math.round(saturation * 100)}%, ${Math.round(
    lightness * 100,
  )}%)`;
}

/** 按 format 生成展示文案，非法 hex 原样返回 */
function formatText(hex: string, format: ColorPickerFormat): string {
  const rgb = parseHex(hex);
  if (!rgb) return hex;
  if (format === 'rgb') return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  if (format === 'hsl') return toHslText(rgb);
  return hex;
}

/**
 * ColorPicker 组件核心逻辑
 * @param props 组件 Props
 * @returns color 当前色，showClear 清除按钮，isOpen 展开状态，text 展示文案，statusClass 状态类
 */
export const useColorPicker = (
  props: QColorPickerProps,
): UseColorPickerReturn => {
  /** 非受控模式下的展开状态 */
  const innerOpen = ref(false);

  /** 当前颜色，缺省为黑色 */
  const color = computed(() => props.value || DEFAULT_COLOR);

  /** 是否展示清除按钮：开启 allowClear 且有值 */
  const showClear = computed(
    () => (props.allowClear ?? false) && !!props.value,
  );

  /** 展开状态：受控时以 props.open 为准，否则回落到内部状态；写入用于内部开合 */
  const isOpen = computed<boolean>({
    get: () => (props.open === undefined ? innerOpen.value : props.open),
    set: (open: boolean) => {
      innerOpen.value = open;
    },
  });

  /** 展示文案 */
  const text = computed(() => formatText(color.value, props.format ?? 'hex'));

  /** 状态修饰类 */
  const statusClass = computed(() =>
    props.status ? `q-color-picker--${props.status}` : '',
  );

  return { color, showClear, isOpen, text, statusClass };
};
