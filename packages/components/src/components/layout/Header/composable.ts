import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { HeaderProps } from './type';

/** useHeader 返回值接口 */
export interface UseHeaderReturn {
  /** 顶栏高度内联样式 */
  heightStyle: ComputedRef<Record<string, string>>;
}

/**
 * QHeader 组件核心逻辑
 * @param props 组件 Props
 * @returns 高度内联样式
 */
export const useHeader = (props: HeaderProps): UseHeaderReturn => {
  /** 高度：透传数字为 px */
  const heightStyle = computed<Record<string, string>>(() => {
    const style: Record<string, string> = {};
    if (props.height !== undefined) {
      style.height = `${props.height}px`;
    }
    return style;
  });

  return { heightStyle };
};
