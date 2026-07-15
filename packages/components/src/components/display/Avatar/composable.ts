import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

import type { AvatarProps } from './type';

export function useAvatarLazy(props: AvatarProps) {
  // 样式用的字符串
  const size = computed(() => parseSize(props.size));

  // 引用
  const containerRef = useTemplateRef<HTMLElement>('containerRef');
  const imgRef = useTemplateRef<HTMLImageElement>('imgRef');

  // 状态
  const loaded = ref(false);
  const shouldRenderImage = ref(false);
  const loadError = ref(false);

  // 事件处理
  const handleImageLoad = () => {
    loaded.value = true;
    loadError.value = false;
  };

  const handleImageError = () => {
    loaded.value = true;
    loadError.value = true;
    console.warn(`Avatar failed to load: ${props.url}`);
  };

  // IntersectionObserver 相关
  let observer: IntersectionObserver | null = null;

  const loadImage = () => {
    shouldRenderImage.value = true;
  };

  onMounted(() => {
    const container = containerRef.value;
    if (!container) return;

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer?.unobserve(container);
        }
      });
    });

    observer.observe(container);
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });

  return {
    size,
    loaded,
    shouldRenderImage,
    loadError,
    containerRef,
    imgRef,
    handleImageLoad,
    handleImageError,
  };
}

/** 解析 size 为带单位的字符串 */
function parseSize(size: string | undefined): string {
  return size || '2rem';
}
