import { computed, type ComputedRef } from 'vue';

import type { ProgressBarProps } from './type';

/** 进度条内联样式 */
interface BarStyle {
  width: string;
  height: string;
  backgroundColor: string | undefined;
}

/**
 * ProgressBar 组件核心逻辑
 * @param props 组件 Props
 * @returns barStyle 进度条内联样式，containerClass 容器方向类
 */
export const useProgressBar = (
  props: ProgressBarProps,
): {
  barStyle: ComputedRef<BarStyle>;
  containerClass: ComputedRef<Record<string, boolean>>;
} => {
  /** 进度条内联样式 */
  const barStyle = computed(() => ({
    width: props.direction === 'horizontal' ? props.percent : '100%',
    height: props.direction === 'vertical' ? props.percent : '100%',
    backgroundColor: props.color,
  }));

  /** 容器方向类 */
  const containerClass = computed(() => ({
    'container-column': props.direction === 'vertical',
  }));

  return { barStyle, containerClass };
};
