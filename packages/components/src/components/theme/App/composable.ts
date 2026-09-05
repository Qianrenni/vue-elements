import { useMessage } from '@/utils/business/useMessage';
import { useNotification } from '@/utils/business/useNotification';
import type { QNotificationScope } from '@/utils/business/useNotification';
import { inject, type InjectionKey, provide } from 'vue';

/** QApp 提供的上下文（含作用域通知 API） */
export interface QAppContext {
  /** 全局消息（当前为全局单例，未作用域化） */
  message: typeof useMessage;
  /** 绑定到本 QApp 作用域的通知 API */
  notification: QNotificationScope;
}

/** provide/inject 用的 key */
export const Q_APP_KEY: InjectionKey<QAppContext> = Symbol('q-app');

/**
 * 注入 QApp 上下文（组件内部）
 * @param context App 上下文
 */
export function provideQApp(context: QAppContext): void {
  provide(Q_APP_KEY, context);
}

/**
 * 读取 QApp 上下文；未包裹时回退到全局单例（notification / message）。
 * 用法：`const { notification } = useQApp(); notification.success('已保存')`
 */
export function useQApp(): QAppContext {
  const context = inject(Q_APP_KEY, null);
  if (context) return context;
  return {
    message: useMessage,
    notification: useNotification,
  };
}
