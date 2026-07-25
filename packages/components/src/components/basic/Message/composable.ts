import { computed, type ComputedRef } from 'vue';

import type { MessageProps, MessageType } from './type';

/**
 * Message 组件核心逻辑
 * @param props 组件 Props
 * @returns typeClass 根据消息类型计算 CSS 类名
 */
export const useMessage = (
  props: MessageProps,
): {
  typeClass: ComputedRef<string>;
} => {
  /** 消息类型到 CSS 类名的映射 */
  const typeClassMap: Record<MessageType, string> = {
    success: 'text-success',
    error: 'text-danger',
    warning: 'text-warning',
    info: 'text-gray',
  };

  const typeClass = computed(() => typeClassMap[props.type]);

  return { typeClass };
};
