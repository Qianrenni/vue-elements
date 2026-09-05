import { QDialog } from '@/components/layout/Dialog';
import { createVNode, render, type VNode } from 'vue';

/** 作用域化命令式弹窗配置（对标 antd Modal.confirm） */
export interface ModalConfirmOptions {
  /** 标题 */
  title?: string;
  /** 内容：文本或 VNode */
  content?: string | VNode;
  /** 确认按钮文本（默认「确定」） */
  confirmText?: string;
  /** 取消按钮文本（默认「取消」） */
  cancelText?: string;
  /** 是否显示取消按钮（默认 true） */
  showCancel?: boolean;
  /** 是否显示右上角关闭 ×（默认 true） */
  showClose?: boolean;
  /** 点击遮罩是否关闭（默认 false，需显式操作按钮） */
  maskClosable?: boolean;
}

/** 弹窗作用域实例（QDialog 命令式：confirm / alert） */
export interface QModalScope {
  /**
   * 确认弹窗。返回 Promise：点「确定」resolve(true)，取消/关闭 resolve(false)。
   */
  confirm: (options: ModalConfirmOptions) => Promise<boolean>;
  /** 提示弹窗：仅「确定」，resolve(true) */
  alert: (options: Omit<ModalConfirmOptions, 'showCancel'>) => Promise<boolean>;
  /** 销毁作用域：关闭所有仍打开的弹窗（resolve(false)）并清理 DOM */
  destroy: () => void;
}

type Cleanup = (value: boolean) => void;

/**
 * 创建一个弹窗作用域。
 * 命令式渲染 QDialog；卸载时 destroy() 关闭所有弹窗避免残留。
 */
export function createModalScope(): QModalScope {
  const pending: Cleanup[] = [];

  const open = (
    options: ModalConfirmOptions,
    forceShowCancel: boolean,
  ): Promise<boolean> =>
    new Promise((resolve) => {
      if (typeof document === 'undefined') {
        resolve(false);
        return;
      }
      const wrapper = document.createElement('div');
      wrapper.className = 'q-modal-scope-host';
      document.body.appendChild(wrapper);

      let settled = false;
      const cleanup: Cleanup = (value) => {
        if (settled) return;
        settled = true;
        const index = pending.indexOf(cleanup);
        if (index > -1) pending.splice(index, 1);
        render(null, wrapper);
        wrapper.remove();
        resolve(value);
      };
      pending.push(cleanup);

      const showCancel = options.showCancel ?? forceShowCancel;
      const vnode = createVNode(
        QDialog,
        {
          visible: true,
          title: options.title,
          confirmText: options.confirmText ?? '确定',
          cancelText: options.cancelText ?? '取消',
          showClose: options.showClose ?? true,
          showCancel,
          closeOnClickOverlay: options.maskClosable ?? false,
          onConfirm: () => cleanup(true),
          onCancel: () => cleanup(false),
          onClose: () => cleanup(false),
        },
        {
          default: () => (options.content !== undefined ? options.content : ''),
        },
      );
      render(vnode, wrapper);
    });

  return {
    confirm: (options) => open(options, true),
    alert: (options) => open(options, false),
    destroy: () => {
      pending.splice(0).forEach((cleanup) => cleanup(false));
    },
  };
}
