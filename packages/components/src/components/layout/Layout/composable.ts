import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type { LayoutProps } from './type';

/** useLayout 返回值接口 */
export interface UseLayoutReturn {
  /** 是否检测到含 Sider */
  hasSider: Ref<boolean>;
  /** 最终 class 对象 */
  classes: ComputedRef<Record<string, boolean>>;
}

/**
 * QLayout 组件核心逻辑：通过自身根元素的直接子元素检测是否存在 QSider，
 * 从而自动切换为「含 Sider」的横向布局。
 *
 * 说明：QSider 以插槽内容渲染，provide/inject 无法跨插槽边界；
 * 采用「MutationObserver 监听根元素子节点 + 初次挂载后补扫」的方式检测
 * 直接子元素中是否存在 `.q-layout-sider`，从而兼容异步/动态内容。
 * @param props 组件 Props
 * @returns 状态
 */
export const useLayout = (props: LayoutProps): UseLayoutReturn => {
  /** QLayout 根元素 */
  const rootRef = useTemplateRef<HTMLElement>('layoutRoot');

  /** 直接子元素中含 Sider */
  const detected = ref(false);

  let observer: MutationObserver | null = null;

  /** 刷新检测结果：扫描直接子元素 */
  function refresh() {
    const root = rootRef.value;
    if (!root) return;
    let found = false;
    for (const child of Array.from(root.children)) {
      if (child.classList.contains('q-layout-sider')) {
        found = true;
        break;
      }
    }
    detected.value = found;
  }

  onMounted(() => {
    // 初次挂载：插槽内容可能尚未插入，微任务后再补扫一次
    refresh();
    requestAnimationFrame(() => refresh());
    // setTimeout(0)：在所有子组件同步挂载完成后补扫（rAF 在测试/某些环境可能不触发）
    setTimeout(() => refresh(), 0);

    // 监听子节点增删（覆盖动态切换 Sider 的场景）
    observer = new MutationObserver(() => refresh());
    const root = rootRef.value;
    if (root) {
      observer.observe(root, { childList: true });
    }
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
    detected.value = false;
  });

  /** 是否按「含 Sider」布局（props.hasSider === true 时强制；否则自动检测） */
  const hasSider = computed(() =>
    props.hasSider === true ? true : detected.value,
  );

  /** 根元素 class */
  const classes = computed<Record<string, boolean>>(() => ({
    'q-layout--has-sider': hasSider.value,
  }));

  return { hasSider, classes };
};
