import { QMessage } from '@/components/basic/Message';
import type { MessageType } from '@/components/basic/Message';
import { createVNode, render, type VNode } from 'vue';

/**
 * 作用域化消息配置。
 * 字符串即内容，等价于 { message }。
 */
export type MessageScopeContent = string | MessageScopeOptions;

export interface MessageScopeOptions {
  /** 消息内容 */
  message: string;
  /** 消息类型（默认 info） */
  type?: MessageType;
  /** 自动关闭时长 ms，0 表示常驻（默认 1500） */
  duration?: number;
  /** 关闭回调 */
  onClose?: () => void;
}

/** open 返回句柄 */
export interface MessageScopeHandle {
  /** 立即关闭该条 */
  close: () => void;
}

/** 消息作用域实例（形如 useMessage，可挂载到指定 host 以继承主题） */
export interface MessageScope {
  show: (options: MessageScopeContent) => MessageScopeHandle;
  info: (options: MessageScopeContent) => MessageScopeHandle;
  success: (options: MessageScopeContent) => MessageScopeHandle;
  warning: (options: MessageScopeContent) => MessageScopeHandle;
  error: (options: MessageScopeContent) => MessageScopeHandle;
  /** 关闭当前作用域全部消息 */
  closeAll: () => void;
  /** 销毁作用域（清空全部并移除容器） */
  destroy: () => void;
}

interface MessageEntry {
  wrapper: HTMLDivElement;
  vnode: VNode;
  timer: ReturnType<typeof setTimeout> | null;
  onClose?: () => void;
}

const STYLE_ID = 'q-message-scope-style';

/** 注入一次全局样式（容器定位 + 入场动画） */
function ensureStyle(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
.q-message-scope {
  position: fixed;
  top: 5vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 9999;
  pointer-events: none;
}
.q-message-scope > * {
  pointer-events: auto;
  animation: q-message-in 0.25s ease;
}
@keyframes q-message-in {
  from { opacity: 0; transform: translateY(-16px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
  document.head.appendChild(style);
}

const normalize = (raw: MessageScopeContent): MessageScopeOptions =>
  typeof raw === 'string'
    ? { message: raw, type: 'info' }
    : { type: 'info', ...raw };

/**
 * 创建一个消息作用域。
 * @param options.host 容器挂载点（HTMLElement 或返回它的函数）；缺省挂到 body。
 */
export function createMessageScope(options?: {
  host?: HTMLElement | (() => HTMLElement | null | undefined);
}): MessageScope {
  const host = options?.host;
  const entries: MessageEntry[] = [];
  let container: HTMLDivElement | null = null;

  const resolveHost = (): HTMLElement | null => {
    if (typeof document === 'undefined') return null;
    if (typeof host === 'function') return host() ?? document.body;
    return host ?? document.body;
  };

  const ensureContainer = (): HTMLDivElement | null => {
    if (container?.isConnected) return container;
    const root = resolveHost();
    if (!root) return null;
    ensureStyle();
    container = document.createElement('div');
    container.className = 'q-message-scope';
    root.appendChild(container);
    return container;
  };

  const removeEntry = (entry: MessageEntry) => {
    if (entry.timer) clearTimeout(entry.timer);
    entry.timer = null;
    render(null, entry.wrapper);
    entry.wrapper.remove();
    entry.onClose?.();
  };

  const show = (raw: MessageScopeContent): MessageScopeHandle => {
    const opts = normalize(raw);
    const el = ensureContainer();
    if (!el) return { close: () => {} };

    const wrapper = document.createElement('div');
    el.appendChild(wrapper);
    const entry: MessageEntry = {
      wrapper,
      vnode: null as unknown as VNode,
      timer: null,
      onClose: opts.onClose,
    };
    entry.vnode = createVNode(QMessage, {
      message: opts.message,
      type: opts.type ?? 'info',
    });
    render(entry.vnode, wrapper);
    entries.push(entry);

    const duration = opts.duration ?? 1500;
    if (duration > 0) {
      entry.timer = setTimeout(() => {
        const index = entries.indexOf(entry);
        if (index > -1) entries.splice(index, 1);
        removeEntry(entry);
        if (
          container &&
          container.childElementCount === 0 &&
          entries.length === 0
        ) {
          container.remove();
          container = null;
        }
      }, duration);
    }

    return {
      close: () => {
        const index = entries.indexOf(entry);
        if (index === -1) return;
        entries.splice(index, 1);
        removeEntry(entry);
        if (container && container.childElementCount === 0) {
          container.remove();
          container = null;
        }
      },
    };
  };

  const shortcut =
    (type: MessageType) =>
    (options: MessageScopeContent): MessageScopeHandle =>
      show({ ...normalize(options), type });

  const closeAll = () => {
    entries.splice(0).forEach(removeEntry);
    if (container) {
      container.remove();
      container = null;
    }
  };

  const destroy = closeAll;

  return {
    show,
    info: shortcut('info'),
    success: shortcut('success'),
    warning: shortcut('warning'),
    error: shortcut('error'),
    closeAll,
    destroy,
  };
}
