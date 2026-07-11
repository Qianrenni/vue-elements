import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';
import type { LazyImageProps } from './type';

export function useLazyImage(props: LazyImageProps) {
  // 样式用的字符串
  const width = computed(() => parseSize(props.width));
  const height = computed(() => parseSize(props.height));

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
    console.warn(`Image failed to load: ${props.src}`);
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
    width,
    height,
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
function parseSize(size: string | number | undefined): string {
  if (size === undefined) return '100%';
  return typeof size === 'number' ? `${size}px` : size;
}
