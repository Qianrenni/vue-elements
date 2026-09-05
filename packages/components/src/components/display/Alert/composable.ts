import { computed, type ComputedRef } from 'vue';

import type { QAlertProps, QAlertType } from './type';

/** 类型默认值 */
export const DEFAULT_ALERT_TYPE: QAlertType = 'info';

/** 各类型图标字符 */
export const ALERT_GLYPHS: Record<QAlertType, string> = {
  success: '✓',
  info: 'i',
  warning: '!',
  error: '×',
};

/** 归一化类型 */
export function normalizeAlertType(type: QAlertType | undefined): QAlertType {
  return type ?? DEFAULT_ALERT_TYPE;
}

/** 类型对应的图标字符 */
export function alertGlyph(type: QAlertType): string {
  return ALERT_GLYPHS[type] ?? ALERT_GLYPHS.info;
}

/** useQAlert 返回值 */
export interface UseQAlertReturn {
  /** 生效类型 */
  type: ComputedRef<QAlertType>;
  /** 图标字符 */
  glyph: ComputedRef<string>;
  /** 是否有描述 */
  hasDescription: ComputedRef<boolean>;
}

/**
 * QAlert 组件核心逻辑
 * @param props 组件 Props
 * @returns 派生状态
 */
export const useQAlert = (props: QAlertProps): UseQAlertReturn => {
  const type = computed(() => normalizeAlertType(props.type));
  const glyph = computed(() => alertGlyph(type.value));
  const hasDescription = computed(
    () => !!props.description && props.description.trim().length > 0,
  );
  return { type, glyph, hasDescription };
};
