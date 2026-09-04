import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import type { ComputedRef, Ref } from 'vue';

import type { AnchorEmits, AnchorItem, AnchorProps } from './type';

/** 展平后的锚点（含层级） */
export interface FlattenedAnchor extends AnchorItem {
  /** 是否二级 */
  depth: number;
}

/** useAnchor 返回值接口 */
export interface UseAnchorReturn {
  /** 展平锚点列表（一级 + 二级，按序） */
  flat: ComputedRef<FlattenedAnchor[]>;
  /** 当前激活的 href */
  activeHref: Ref<string>;
  /** 点击锚点处理 */
  handleClick: (item: AnchorItem) => void;
  /** 绑定/解绑窗口滚动监听（页面级滚动锚点） */
  bindScroll: () => void;
  /** 移除滚动监听 */
  unbindScroll: () => void;
}

/**
 * QAnchor 组件核心逻辑：滚动高亮（scrollspy）+ 点击平滑滚动。
 * 以「页面滚动（window）」为默认滚动源，监听窗口 scroll(capture) 计算当前激活锚点。
 * @param props 组件 Props
 * @param emit  组件 Emits
 * @returns 状态与处理器
 */
export const useAnchor = (
  props: AnchorProps,
  emit: AnchorEmits,
): UseAnchorReturn => {
  /** 展平锚点列表（一级 + 二级，按序） */
  const flat = computed<FlattenedAnchor[]>(() => {
    const out: FlattenedAnchor[] = [];
    for (const item of props.items ?? []) {
      out.push({ ...item, depth: 0 });
      for (const child of item.children ?? []) {
        out.push({ ...child, depth: 1 });
      }
    }
    return out;
  });

  /** 当前激活 href（默认取第一个锚点） */
  const activeHref = ref('');

  /** 由 href 取目标元素（全局查找；同文档内） */
  function resolveEl(href: string): HTMLElement | null {
    if (!href.startsWith('#')) return null;
    return document.getElementById(href.slice(1));
  }

  /** 依据当前滚动位置计算激活锚点（距视口顶部 <= offsetTop 且最靠前/最靠下的那个） */
  function computeActive() {
    const offset = props.offsetTop ?? 0;
    let current = '';
    // 顺序遍历：目标元素顶部一旦越过触发线即记为候选，
    // 保持「最后一个越过触发线且未滑出顶部的锚点」？antd 语义：当前视口最顶部区块激活。
    // 此处采用：目标顶部 <= offset 时激活；多个满足时取列表靠后的（更贴近视口顶部）。
    for (const item of flat.value) {
      const el = resolveEl(item.href);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      // 元素顶部距视口顶部小于等于触发线：已进入高亮区
      if (rect.top <= offset) current = item.href;
    }
    // 若整页尚未滚动到任何锚点，则激活第一个
    if (!current && flat.value.length) {
      const first = flat.value[0];
      const el = resolveEl(first.href);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0) current = first.href;
      }
    }
    if (current !== activeHref.value) {
      activeHref.value = current;
      if (current) emit('change', current);
    }
  }

  let rafId = 0;

  /** 滚动处理（rAF 节流） */
  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      computeActive();
    });
  }

  /** 绑定窗口滚动与尺寸监听 */
  function bindScroll() {
    window.addEventListener('scroll', onScroll, { capture: true });
    window.addEventListener('resize', onScroll);
    computeActive();
  }

  /** 移除监听 */
  function unbindScroll() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    window.removeEventListener('scroll', onScroll, true);
    window.removeEventListener('resize', onScroll);
  }

  /** 点击锚点：平滑滚动 + 可选更新 hash */
  function handleClick(item: AnchorItem) {
    if (props.disabled) return;
    emit('click', item);
    const el = resolveEl(item.href);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (props.updateHash) {
      history.pushState(null, '', item.href);
    }
    activeHref.value = item.href;
    emit('change', item.href);
  }

  onMounted(() => {
    // 初始激活
    activeHref.value = flat.value[0]?.href ?? '';
    bindScroll();
  });
  onBeforeUnmount(() => {
    unbindScroll();
  });

  return { flat, activeHref, handleClick, bindScroll, unbindScroll };
};
