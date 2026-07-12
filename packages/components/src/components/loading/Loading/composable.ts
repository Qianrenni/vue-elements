import { computed, defineAsyncComponent, type Component } from 'vue';
import type { LoadingProps } from './type';

const animationMap: Record<string, Component> = {
  breathing: defineAsyncComponent(() => import('../animations/Breathing.vue')),
  spinner: defineAsyncComponent(() => import('../animations/Spinner.vue')),
  skeleton: defineAsyncComponent(() => import('../animations/Skeleton.vue')),
};

/**
 * useLoading - Loading 组件核心逻辑
 *
 * @param props - LoadingProps
 * @returns 动画组件引用
 */
export function useLoading(props: LoadingProps) {
  const animationComponent = computed(
    () => animationMap[props.type ?? 'breathing'],
  );

  return {
    animationComponent,
  };
}
