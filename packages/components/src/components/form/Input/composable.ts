import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QInputProps } from './type';

/** useInput 返回值接口 */
export interface UseInputReturn {
  /** 当前文本 */
  text: ComputedRef<string>;
  /** 是否展示清除按钮 */
  showClear: ComputedRef<boolean>;
  /** 字数统计文案（未开启时为空字符串） */
  countText: ComputedRef<string>;
  /** 状态修饰类 */
  statusClass: ComputedRef<string>;
  /** 尺寸修饰类 */
  sizeClass: ComputedRef<string>;
}

/**
 * Input 组件核心逻辑
 * @param props 组件 Props
 * @returns text 文本，showClear 清除按钮，countText 统计，statusClass/sizeClass 修饰类
 */
export const useInput = (props: QInputProps): UseInputReturn => {
  /** 当前文本，默认空字符串 */
  const text = computed(() => props.value ?? '');

  /** 是否展示清除按钮：开启 allowClear 且有内容 */
  const showClear = computed(
    () => (props.allowClear ?? false) && text.value.length > 0,
  );

  /** 字数统计文案 */
  const countText = computed(() => {
    if (!props.showCount) return '';
    return props.maxLength === undefined
      ? `${text.value.length}`
      : `${text.value.length} / ${props.maxLength}`;
  });

  /** 状态修饰类 */
  const statusClass = computed(() =>
    props.status ? `q-input--${props.status}` : '',
  );

  /** 尺寸修饰类 */
  const sizeClass = computed(() => `q-input--${props.size ?? 'middle'}`);

  return { text, showClear, countText, statusClass, sizeClass };
};
