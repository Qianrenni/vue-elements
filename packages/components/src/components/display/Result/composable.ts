import { computed, type ComputedRef } from 'vue';

import type { QResultProps, QResultStatus } from './type';

/** 默认状态 */
export const DEFAULT_RESULT_STATUS: QResultStatus = 'info';

/** 语义态图标字符 */
export const RESULT_GLYPHS: Partial<Record<QResultStatus, string>> = {
  success: '✓',
  info: 'i',
  warning: '!',
  error: '×',
};

/** 是否为 HTTP 码态（非圆形图标，走大数字图形） */
export function isHttpResult(status: QResultStatus): boolean {
  return status === '404' || status === '403' || status === '500';
}

/** 归一化状态 */
export function normalizeResultStatus(
  status: QResultStatus | undefined,
): QResultStatus {
  return status ?? DEFAULT_RESULT_STATUS;
}

/** useQResult 返回值 */
export interface UseQResultReturn {
  /** 生效状态 */
  status: ComputedRef<QResultStatus>;
  /** 图标字符（HTTP 态为空） */
  glyph: ComputedRef<string>;
  /** 是否为 HTTP 码态 */
  isHttp: ComputedRef<boolean>;
}

/**
 * QResult 组件核心逻辑
 * @param props 组件 Props
 * @returns 派生状态
 */
export const useQResult = (props: QResultProps): UseQResultReturn => {
  const status = computed(() => normalizeResultStatus(props.status));
  const glyph = computed(() => RESULT_GLYPHS[status.value] ?? '');
  const isHttp = computed(() => isHttpResult(status.value));
  return { status, glyph, isHttp };
};
