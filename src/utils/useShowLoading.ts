import { createVNode, render, type VNode } from "vue";
import Loading from "@/components/loading/Loading.vue";
let instance: VNode | null = null;
let container: HTMLDivElement | null = null; // 👈 新增

export const useShowLoading = {
  show() {
    // 避免重复创建
    if (container) return;

    container = document.createElement('div');
    container.id = 'loading-container';
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.zIndex = '9999';
    container.style.backgroundColor = 'transparent';
    container.style.boxShadow = '0 0 0 10000px var(--shadow-common)'
    document.body.appendChild(container);

    const vnode = createVNode(Loading, {
      type: 'breathing',
    });

    render(vnode, container);
    instance = vnode;
  },

  hide() {
    if (instance && container) {
      render(null, container); // 卸载 vnode
      document.body.removeChild(container); // 

      // 清理引用
      instance = null;
      container = null;
    }
  }
};