import { computed, type ComputedRef } from 'vue';

import type { QNotificationProps, QNotificationType } from './type';

/** 通知类型 → 根类名 */
export const NOTIFICATION_TYPE_CLASS: Record<QNotificationType, string> = {
  success: 'q-notification--success',
  info: 'q-notification--info',
  warning: 'q-notification--warning',
  error: 'q-notification--error',
};

/**
 * 获取通知类型对应类名
 * @param type 通知类型
 */
export function getNotificationTypeClass(type: QNotificationType): string {
  return NOTIFICATION_TYPE_CLASS[type] ?? NOTIFICATION_TYPE_CLASS.info;
}

/** useQNotificationItem 返回值 */
export interface UseQNotificationItemReturn {
  /** 类型类名 */
  typeClass: ComputedRef<string>;
}

/**
 * QNotification 单条卡片逻辑
 * @param props 组件 Props
 */
export const useQNotificationItem = (
  props: QNotificationProps,
): UseQNotificationItemReturn => {
  const typeClass = computed(() =>
    getNotificationTypeClass(props.type ?? 'info'),
  );
  return { typeClass };
};
