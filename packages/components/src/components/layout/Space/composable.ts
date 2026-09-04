import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QSpaceProps, QSpaceSize } from './type';

/** 预设档位 → 间距 token */
const SIZE_TOKEN: Record<string, string> = {
  small: 'var(--q-space-4)', // 8px
  middle: 'var(--q-space-6)', // 16px
  large: 'var(--q-space-8)', // 24px
};

/** useQSpace 返回值接口 */
export interface UseQSpaceReturn {
  /** 布局修饰类 */
  classList: ComputedRef<Record<string, boolean>>;
  /** 内联样式（gap / align-items） */
  inlineStyle: ComputedRef<Record<string, string>>;
}

/**
 * QSpace 组件核心逻辑
 * @param props 组件 Props
 * @returns 布局类与内联样式
 */
export const useQSpace = (props: QSpaceProps): UseQSpaceReturn => {
  /** 方向默认值 */
  const direction = computed<QSpaceProps['direction']>(
    () => props.direction ?? 'horizontal',
  );

  /** 间距值解析 */
  const gap = computed<string>(() => {
    const size: QSpaceSize = props.size ?? 'middle';
    if (typeof size === 'number') return `${size}px`;
    if (typeof size === 'string') return SIZE_TOKEN[size] ?? size;
    return SIZE_TOKEN.middle;
  });

  /** 是否开启分隔 */
  const hasSplit = computed<boolean>(
    () => props.split !== undefined && props.split !== false,
  );

  /** 分隔文本（string 时） */
  const splitText = computed<string>(() =>
    typeof props.split === 'string' ? props.split : '',
  );

  /** 布局修饰类 */
  const classList = computed(() => ({
    'q-space--vertical': direction.value === 'vertical',
    [`q-space--align-${props.align ?? 'center'}`]: true,
    'q-space--wrap': props.wrap ?? false,
    'q-space--split': hasSplit.value,
    'q-space--split-text': typeof props.split === 'string',
    'q-space--split-bar': props.split === true,
  }));

  /** 内联样式：普通模式用 gap；分隔模式取消 gap，改由子项伪元素 + 分隔变量控制 */
  const inlineStyle = computed<Record<string, string>>(() => {
    const style: Record<string, string> = {};
    if (hasSplit.value) {
      style.rowGap = '0px';
      style.columnGap = '0px';
      style['--q-split-gap'] = gap.value;
      style['--q-split-content'] = splitText.value
        ? JSON.stringify(splitText.value)
        : '""';
    } else {
      style.rowGap = gap.value;
      style.columnGap = gap.value;
    }
    return style;
  });

  return { classList, inlineStyle };
};
