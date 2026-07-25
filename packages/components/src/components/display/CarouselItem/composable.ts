import { computed, type ComputedRef } from 'vue';

/**
 * CarouselItem 组件核心逻辑
 * @returns containerClass 轮播项容器类名
 */
export const useCarouselItem = (): {
  containerClass: ComputedRef<string>;
} => {
  const containerClass = computed(() => 'carousel-item');

  return { containerClass };
};
