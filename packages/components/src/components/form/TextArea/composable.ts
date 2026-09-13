import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QTextAreaProps, TextAreaAutoSize } from './type';

/** useTextArea 返回值接口 */
export interface UseTextAreaReturn {
  /** 当前文本 */
  text: ComputedRef<string>;
  /** 是否展示清除按钮 */
  showClear: ComputedRef<boolean>;
  /** 字数统计文案（未开启 showCount 时为空字符串） */
  countText: ComputedRef<string>;
  /** 状态修饰类 */
  statusClass: ComputedRef<string>;
  /** 自动高度配置（未开启时为 null） */
  autoSizeConfig: ComputedRef<TextAreaAutoSize | null>;
}

/**
 * TextArea 组件核心逻辑
 * @param props 组件 Props
 * @returns text 文本，showClear 清除按钮，countText 字数统计，statusClass 状态类
 */
export const useTextArea = (props: QTextAreaProps): UseTextAreaReturn => {
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
    props.status ? `q-textarea--${props.status}` : '',
  );

  /** 自动高度配置：false 时为 null */
  const autoSizeConfig = computed<TextAreaAutoSize | null>(() => {
    if (!props.autoSize) return null;
    return typeof props.autoSize === 'object' ? props.autoSize : {};
  });

  return { text, showClear, countText, statusClass, autoSizeConfig };
};
