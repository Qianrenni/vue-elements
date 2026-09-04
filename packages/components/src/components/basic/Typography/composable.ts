import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QTypographyProps } from './type';

/** useQTypography 返回值接口 */
export interface UseQTypographyReturn {
  /** 根标签名（含默认解析） */
  tag: ComputedRef<string>;
  /** 语义类型（默认 undefined） */
  type: ComputedRef<QTypographyProps['type']>;
  /** 排版修饰类 */
  classList: ComputedRef<Record<string, boolean>>;
  /** 需要内联的 CSS 变量（如多行省略行数） */
  styleVars: ComputedRef<Record<string, string>>;
  /** 是否展示复制按钮 */
  showCopy: ComputedRef<boolean>;
}

/**
 * QTypography 组件核心逻辑
 * @param props 组件 Props
 * @returns 根标签、修饰类与派生状态
 */
export const useQTypography = (
  props: QTypographyProps,
): UseQTypographyReturn => {
  /** 根标签解析：tag > level(h1~h5) > paragraph(p) > span */
  const tag = computed<string>(() => {
    if (props.tag) return props.tag;
    if (props.level) return `h${props.level}`;
    if (props.paragraph) return 'p';
    return 'span';
  });

  /** 语义类型 */
  const type = computed<QTypographyProps['type']>(() => props.type);

  /** 排版修饰类 */
  const classList = computed(() => ({
    [`q-typ--type-${type.value}`]: !!type.value,
    'q-typ--disabled': props.disabled ?? false,
    'q-typ--strong': props.strong ?? false,
    'q-typ--italic': props.italic ?? false,
    'q-typ--underline': props.underline ?? false,
    'q-typ--delete': props.delete ?? false,
    'q-typ--mark': props.mark ?? false,
    'q-typ--code': props.code ?? false,
    'q-typ--keyboard': props.keyboard ?? false,
    'q-typ--ellipsis': !!props.ellipsis,
    'q-typ--paragraph': props.paragraph ?? false,
    'q-typ--copyable': props.copyable ?? false,
  }));

  /** 内联 CSS 变量：多行省略行数 */
  const styleVars = computed(() => {
    const vars: Record<string, string> = {};
    if (typeof props.ellipsis === 'number') {
      vars['--q-typ-lines'] = String(props.ellipsis);
    }
    return vars;
  });

  /** 是否展示复制按钮 */
  const showCopy = computed(() => props.copyable ?? false);

  return { tag, type, classList, styleVars, showCopy };
};
