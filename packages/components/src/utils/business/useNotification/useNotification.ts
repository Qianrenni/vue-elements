import { QNotification } from '@/components/basic/Notification';
import type {
  QNotificationPlacement,
  QNotificationType,
} from '@/components/basic/Notification';
import { createVNode, render, type VNode } from 'vue';

export type { QNotificationPlacement, QNotificationType };

export interface QNotificationOptions {
  /** 通知标题 */
  title?: string;
  /** 通知详情 */
  description?: string;
  /** 通知类型 */
  type?: QNotificationType;
  /** 弹出位置（默认 topRight） */
  placement?: QNotificationPlacement;
  /** 自动关闭时长(ms)，0 表示不自动关闭（默认 4500） */
  duration?: number;
  /** 是否可手动关闭 */
  closable?: boolean;
  /** 是否显示类型图标 */
  showIcon?: boolean;
  /** 唯一 key，用于 close(key) */
  key?: string | number;
  /** 点击通知卡片回调 */
  onClick?: () => void;
  /** 关闭回调 */
  onClose?: () => void;
}

/** 通知容器级默认配置 */
export interface QNotificationDefaults {
  placement: QNotificationPlacement;
  duration: number;
  maxCount: number;
}

/** open 返回句柄 */
export interface QNotificationHandle {
  key: string;
  /** 手动关闭该条 */
  close: () => void;
}

/** 通知作用域实例 */
export interface QNotificationScope {
  /** 修改默认配置 */
  config: (defaults: Partial<QNotificationDefaults>) => void;
  /** 打开一条通知 */
  open: (options: QNotificationOptions | string) => QNotificationHandle;
  success: (options: QNotificationOptions | string) => QNotificationHandle;
  info: (options: QNotificationOptions | string) => QNotificationHandle;
  warning: (options: QNotificationOptions | string) => QNotificationHandle;
  error: (options: QNotificationOptions | string) => QNotificationHandle;
  /** 按 key 关闭 */
  close: (key: string | number) => void;
  /** 关闭当前作用域全部通知 */
  closeAll: () => void;
  /** 销毁作用域（移除全部容器与 DOM） */
  destroy: () => void;
}

interface NoticeEntry {
  key: string;
  wrapper: HTMLDivElement;
  vnode: VNode;
  timer: ReturnType<typeof setTimeout> | null;
  onClose?: () => void;
}

interface PlacementContainer {
  el: HTMLDivElement;
  entries: NoticeEntry[];
}

const normalizeOptions = (
  options: QNotificationOptions | string,
): QNotificationOptions =>
  typeof options === 'string' ? { title: options } : options;

/**
 * 创建一个通知作用域。
 * @param options.host 容器挂载点（HTMLElement 或返回它的函数）；缺省挂到 body。
 * @param options.defaults 默认 placement / duration / maxCount
 */
export function createNotification(options?: {
  host?: HTMLElement | (() => HTMLElement | null | undefined);
  defaults?: Partial<QNotificationDefaults>;
}): QNotificationScope {
  const host = options?.host;
  const defaults: QNotificationDefaults = {
    placement: 'topRight',
    duration: 4500,
    maxCount: 0,
    ...options?.defaults,
  };
  const containers = new Map<QNotificationPlacement, PlacementContainer>();
  let seq = 0;

  const resolveHost = (): HTMLElement | null => {
    if (typeof document === 'undefined') return null;
    if (typeof host === 'function') return host() ?? document.body;
    return host ?? document.body;
  };

  const ensureContainer = (
    placement: QNotificationPlacement,
  ): PlacementContainer | null => {
    const cached = containers.get(placement);
    if (cached) return cached;
    const root = resolveHost();
    if (!root) return null;
    const el = document.createElement('div');
    el.className = 'q-notification-container';
    el.setAttribute('data-placement', placement);
    root.appendChild(el);
    const container: PlacementContainer = { el, entries: [] };
    containers.set(placement, container);
    return container;
  };

  const removeContainerIfEmpty = (container: PlacementContainer) => {
    if (container.entries.length > 0) return;
    container.el.remove();
    for (const [placement, c] of containers) {
      if (c === container) containers.delete(placement);
    }
  };

  const removeEntry = (entry: NoticeEntry) => {
    if (entry.timer) clearTimeout(entry.timer);
    entry.timer = null;
    render(null, entry.wrapper);
    entry.wrapper.remove();
    entry.onClose?.();
  };

  const open = (raw: QNotificationOptions | string): QNotificationHandle => {
    const options = normalizeOptions(raw);
    const placement = options.placement ?? defaults.placement;
    const container = ensureContainer(placement);
    const key =
      options.key !== undefined
        ? String(options.key)
        : `n-${Date.now()}-${seq++}`;

    // maxCount：超出则关闭最早一条
    if (container) {
      while (
        defaults.maxCount > 0 &&
        container.entries.length >= defaults.maxCount
      ) {
        const oldest = container.entries.shift();
        if (oldest) removeEntry(oldest);
      }
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'q-notification-notice';
    container?.el.appendChild(wrapper);

    const entry: NoticeEntry = {
      key,
      wrapper,
      vnode: null as unknown as VNode,
      timer: null,
      onClose: options.onClose,
    };
    entry.vnode = createVNode(QNotification, {
      type: options.type ?? 'info',
      title: options.title,
      description: options.description,
      closable: options.closable,
      showIcon: options.showIcon,
      onClose: () => close(key),
    });
    render(entry.vnode, wrapper);

    const duration = options.duration ?? defaults.duration;
    if (duration > 0) {
      entry.timer = setTimeout(() => close(key), duration);
    }

    if (options.onClick) {
      wrapper.addEventListener('click', (e) => {
        const target = e.target as HTMLElement | null;
        if (target?.closest('.q-notification-close')) return;
        options.onClick?.();
      });
    }

    container?.entries.push(entry);

    return {
      key,
      close: () => close(key),
    };
  };

  const findEntry = (
    key: string | number,
  ): { container: PlacementContainer; index: number } | null => {
    const k = String(key);
    for (const container of containers.values()) {
      const index = container.entries.findIndex((entry) => entry.key === k);
      if (index >= 0) return { container, index };
    }
    return null;
  };

  const close = (key: string | number) => {
    const found = findEntry(key);
    if (!found) return;
    const { container, index } = found;
    const [entry] = container.entries.splice(index, 1);
    removeEntry(entry);
    removeContainerIfEmpty(container);
  };

  const closeAll = () => {
    for (const container of [...containers.values()]) {
      const entries = container.entries.splice(0);
      entries.forEach(removeEntry);
      removeContainerIfEmpty(container);
    }
  };

  const destroy = () => {
    for (const container of [...containers.values()]) {
      const entries = container.entries.splice(0);
      entries.forEach(removeEntry);
      container.el.remove();
    }
    containers.clear();
  };

  const shortcut =
    (type: QNotificationType) =>
    (options: QNotificationOptions | string): QNotificationHandle =>
      open({ ...normalizeOptions(options), type });

  const scope: QNotificationScope = {
    config: (partial) => {
      Object.assign(defaults, partial);
    },
    open,
    success: shortcut('success'),
    info: shortcut('info'),
    warning: shortcut('warning'),
    error: shortcut('error'),
    close,
    closeAll,
    destroy,
  };
  return scope;
}

/** 全局默认单例（挂到 body） */
export const notification = createNotification();

/** 与 useMessage 命名对齐的命令式单例 */
export const useNotification = notification;
