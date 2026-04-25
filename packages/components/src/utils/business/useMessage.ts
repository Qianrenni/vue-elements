import { MessageOptions, MessageType } from '@/types';
import { createVNode, render, VNode } from 'vue';
import Message from '@/components/basic/Message.vue';

// 创建实例数组
const instances: {
  vnode: VNode;
  timer: ReturnType<typeof setTimeout> | null;
}[] = [];

export const useMessage = {
  /*
   * @param options: string 消息内容 | MessageOptions 配置项
   */
  show(options: string | MessageOptions) {
    const opts =
      typeof options === 'string'
        ? { message: options, type: 'info' as MessageType }
        : { type: 'info', ...options };

    const { message, type, duration = 1500, onClose } = opts;

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '5vh';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    // 👇 提前声明 instance，但先用占位值
    const instance: {
      vnode: VNode;
      timer: ReturnType<typeof setTimeout> | null;
    } = {
      vnode: null as unknown as VNode,
      timer: null,
    };

    // 👇 closeMessage 可以安全引用 instance（此时 instance 已定义）
    const closeMessage = () => {
      if (instance.timer) {
        clearTimeout(instance.timer);
        instance.timer = null;
      }

      const el = instance.vnode.el as HTMLElement;
      if (!el || !container.parentNode) return;

      el.classList.remove('animate-slide-in');
      el.classList.add('animate-slide-out');

      setTimeout(() => {
        render(null, container);
        container.remove();

        const index = instances.indexOf(instance);
        if (index > -1) instances.splice(index, 1);

        onClose?.();
      }, 300);
    };

    // 👇 创建 vnode
    const vnode = createVNode(Message, {
      message,
      type,
    });

    // 👇 补全 instance 的 vnode 字段
    instance.vnode = vnode;

    // 👇 渲染
    render(vnode, container);

    // 👇 保存实例
    instances.push(instance);

    // 👇 设置定时器
    if (duration > 0) {
      instance.timer = setTimeout(() => {
        closeMessage();
      }, duration);
    }

    return {
      close: closeMessage,
    };
  },
  /*
   * @param msg: string 消息内容 | MessageOptions 消息配置项
   */
  info(msg: string | MessageOptions) {
    return this.show({
      ...(typeof msg === 'string' ? { message: msg } : msg),
      type: 'info',
    });
  },
  /*
   * @param msg: string 消息内容 | MessageOptions 消息配置项
   */
  success(msg: string | MessageOptions) {
    return this.show({
      ...(typeof msg === 'string' ? { message: msg } : msg),
      type: 'success',
    });
  },
  /*
   * @param msg: string 消息内容 | MessageOptions 消息配置项
   */
  warning(msg: string | MessageOptions) {
    return this.show({
      ...(typeof msg === 'string' ? { message: msg } : msg),
      type: 'warning',
    });
  },
  /*
   * @param msg: string 消息内容 | MessageOptions 消息配置项
   */
  error(msg: string | MessageOptions) {
    return this.show({
      ...(typeof msg === 'string' ? { message: msg } : msg),
      type: 'error',
    });
  },

  // 关闭所有消息
  closeAll() {
    [...instances].forEach((inst) => {
      if (inst.timer) clearTimeout(inst.timer);
      render(null, inst.vnode.el as HTMLElement);
      inst.vnode.el?.parentElement?.remove();
    });
    instances.length = 0;
  },
};
