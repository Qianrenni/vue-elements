import { onBeforeUnmount, onMounted, type Ref } from 'vue';
import { useThrottle, useWindowResize } from '@/utils';
import type {
  ScrollContainerProps,
  ScrollContainerEmits,
  ScrollToOptions,
} from './type';

/**
 * ScrollContainer 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @param containerRef 滚动容器模板引用
 * @returns scrollTo 滚动到指定位置
 */
export const useScrollContainer = (
  props: ScrollContainerProps,
  emit: ScrollContainerEmits,
  containerRef: Readonly<Ref<HTMLElement | null>>,
): {
  scrollTo: (options: ScrollToOptions) => void;
} => {
  let height = 0;
  let width = 0;
  let lastY = -1;
  let lastX = -1;

  const addScrolHandler = useThrottle(() => {
    const scroll = {
      x: containerRef.value?.scrollLeft ?? 0,
      y: containerRef.value?.scrollTop ?? 0,
    };
    if (
      props.scrollY &&
      containerRef.value &&
      scroll.y > lastY &&
      scroll.y + height >=
        containerRef.value.scrollHeight - (props.threshold ?? 20)
    ) {
      emit('ended');
    }
    if (
      props.scrollX &&
      containerRef.value &&
      scroll.x > lastX &&
      scroll.x + width >=
        containerRef.value.scrollWidth - (props.threshold ?? 20)
    ) {
      emit('ended');
    }
    emit('scroll', scroll);
    lastY = scroll.y;
    lastX = scroll.x;
    if (props.name && props.recoverable) {
      sessionStorage.setItem(
        props.name,
        JSON.stringify({
          left: lastX,
          top: lastY,
        }),
      );
    }
  }, props.emitInterval ?? 16);

  const resizeHandler = () => {
    if (containerRef.value) {
      height = containerRef.value?.offsetHeight ?? 0;
      width = containerRef.value?.offsetWidth ?? 0;
    }
  };

  onMounted(() => {
    if (containerRef.value) {
      height = containerRef.value?.offsetHeight ?? 0;
      width = containerRef.value?.offsetWidth ?? 0;
      if (props.scrollX || props.scrollY) {
        containerRef.value?.addEventListener('scroll', addScrolHandler);
      }
      useWindowResize.addHandler(resizeHandler);
      if (props.name && props.recoverable) {
        const item = sessionStorage.getItem(props.name);
        if (item != null) {
          containerRef.value.scrollTo({
            ...JSON.parse(item),
          });
        }
      }
    } else {
      console.error('scroll-container ref is null');
    }
  });

  onBeforeUnmount(() => {
    containerRef.value?.removeEventListener('scroll', addScrolHandler);
    useWindowResize.removeHandler(resizeHandler);
  });

  const scrollTo = (options: ScrollToOptions) => {
    containerRef.value?.scrollTo(options);
  };

  return { scrollTo };
};
