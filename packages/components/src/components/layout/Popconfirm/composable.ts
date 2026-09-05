import { computed, type ComputedRef } from 'vue';

import type { QPopconfirmProps } from './type';

/** 默认确认 / 取消文案 */
export const DEFAULT_OK_TEXT = '确定';
export const DEFAULT_CANCEL_TEXT = '取消';

/** useQPopconfirm 返回值 */
export interface UseQPopconfirmReturn {
  /** 确认文案 */
  okText: ComputedRef<string>;
  /** 取消文案 */
  cancelText: ComputedRef<string>;
  /** 是否受控 */
  isControlled: ComputedRef<boolean>;
}

/**
 * QPopconfirm 组件核心逻辑（弹层与事件委托给 QPopover）
 * @param props 组件 Props
 * @returns 派生状态
 */
export const useQPopconfirm = (
  props: QPopconfirmProps,
): UseQPopconfirmReturn => {
  const okText = computed(() => props.okText || DEFAULT_OK_TEXT);
  const cancelText = computed(() => props.cancelText || DEFAULT_CANCEL_TEXT);
  const isControlled = computed(() => props.open !== undefined);
  return { okText, cancelText, isControlled };
};
