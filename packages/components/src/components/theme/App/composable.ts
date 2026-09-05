import { useMessage } from '@/utils/business/useMessage';
import { useNotification } from '@/utils/business/useNotification';
import type { QNotificationScope } from '@/utils/business/useNotification';
import { inject, type InjectionKey, provide } from 'vue';

import type { MessageScope } from './messageScope';
import { createModalScope, type QModalScope } from './modalScope';

/** QApp 提供的上下文（作用域 message / notification / modal） */
export interface QAppContext {
  /** 绑定到本 QApp 作用域的消息 API */
  message: MessageScope;
  /** 绑定到本 QApp 作用域的通知 API */
  notification: QNotificationScope;
  /** 绑定到本 QApp 作用域的命令式弹窗（confirm / alert） */
  modal: QModalScope;
}

/** provide/inject 用的 key */
export const Q_APP_KEY: InjectionKey<QAppContext> = Symbol('q-app');

/** 全局消息单例 + destroy 适配（满足 MessageScope） */
const globalMessage: MessageScope = {
  ...useMessage,
  destroy: () => useMessage.closeAll(),
};

let globalModal: QModalScope | null = null;
/** 全局弹窗单例（懒创建） */
const getGlobalModal = (): QModalScope => (globalModal ??= createModalScope());

/**
 * 注入 QApp 上下文（组件内部）
 * @param context App 上下文
 */
export function provideQApp(context: QAppContext): void {
  provide(Q_APP_KEY, context);
}

/**
 * 读取 QApp 上下文；未包裹时回退到全局单例（message / notification / modal）。
 * 用法：`const { message, notification, modal } = useQApp();`
 */
export function useQApp(): QAppContext {
  const context = inject(Q_APP_KEY, null);
  if (context) return context;
  return {
    message: globalMessage,
    notification: useNotification,
    modal: getGlobalModal(),
  };
}
