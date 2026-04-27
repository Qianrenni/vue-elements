import { createVNode, render, type VNode } from 'vue';
import Loading from '@/components/loading/Loading.vue';
let instance: VNode | null = null;
let container: HTMLDivElement | null = null; // 👈 新增

export const useShowLoading = {
  /**
   * 显示加载
   * @param delay 延迟显示，单位毫秒
   */
  show(delay: number = 5000) {
    // 避免重复创建
    if (container) return;

    container = document.createElement('div');
    container.id = 'loading-container';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '9999';
    document.body.appendChild(container);

    const vnode = createVNode(Loading, {
      type: 'skeleton',
    });

    render(vnode, container);
    instance = vnode;
    setTimeout(() => {
      this.hide();
    }, delay);
  },

  hide() {
    if (instance && container) {
      render(null, container); // 卸载 vnode
      document.body.removeChild(container); //

      // 清理引用
      instance = null;
      container = null;
    }
  },
};
