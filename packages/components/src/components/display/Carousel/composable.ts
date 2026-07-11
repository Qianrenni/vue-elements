import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  useTemplateRef,
  watch,
} from 'vue';
import { CarouselEmits, CarouselProps } from './type';

/**
 * useCarousel - 轮播组件核心逻辑
 *
 * @param props - CarouselProps
 * @param emit - CarouselEmits
 */
export function useCarousel(props: CarouselProps, emit: CarouselEmits) {
  const slots = useSlots();

  /* 获取轮播项 */
  const items = computed(() => {
    if (!slots.default) return [];
    if (slots.default()[0].type === Symbol.for('v-fgt')) {
      return (slots.default()[0] as { children: unknown[] }).children;
    }
    return slots
      .default()
      .filter(
        (vnode) =>
          ((vnode.type as { name: string })?.name ?? '') === 'QCarouselItem',
      );
  });

  /** 轮播项数量 */
  const itemsCount = computed(() => items.value?.length ?? 0);

  /** 总轮播项数量（前后各加一个复制项） */
  const totalItemsCount = computed(() => items.value.length + 2);

  /** 当前索引 */
  const currentIndex = ref(1);

  /** 实际索引 */
  const realIndex = computed(() => {
    if (currentIndex.value <= 0) return itemsCount.value - 1;
    if (currentIndex.value >= totalItemsCount.value - 1) return 0;
    return currentIndex.value - 1;
  });

  /** 轮播容器引用 */
  const carousel = useTemplateRef<HTMLElement>('carousel');

  /** 容器内部引用 */
  const containerInner = useTemplateRef<HTMLElement>('containerInner');

  /** 计时器 Id */
  let intervalId: ReturnType<typeof setInterval> | null = null;

  /** 是否正在动画 */
  let isAnimation = false;

  /** 是否使用过渡 */
  const useTransition = ref(true);

  /** 过渡样式 */
  const transition = computed(() =>
    useTransition.value ? `${props.duration}ms ease-in-out` : 'none',
  );

  /** 计算 transform 样式 */
  const transformStyle = computed(() => {
    const value =
      -currentIndex.value * (props.vertical ? props.height : props.width);
    return props.vertical ? `translateY(${value}px)` : `translateX(${value}px)`;
  });

  /** 上一页 */
  function prev() {
    if (!props.loop && currentIndex.value <= 1) return;
    if (isAnimation) return;
    isAnimation = true;
    if (currentIndex.value <= 0) {
      useTransition.value = false;
      currentIndex.value = totalItemsCount.value - 2;
      requestAnimationFrame(() => {
        useTransition.value = true;
        setTimeout(prev, 0);
      });
    } else {
      currentIndex.value -= 1;
    }
    isAnimation = false;
  }

  /** 下一页 */
  function next() {
    if (!props.loop && currentIndex.value >= totalItemsCount.value - 2) return;
    if (isAnimation) return;
    isAnimation = true;
    if (currentIndex.value >= totalItemsCount.value - 1) {
      useTransition.value = false;
      currentIndex.value = 1;
      requestAnimationFrame(() => {
        useTransition.value = true;
        setTimeout(next, 0);
      });
    } else {
      currentIndex.value += 1;
    }
    isAnimation = false;
  }

  /** 跳转到指定页 */
  function goTo(index: number) {
    currentIndex.value = index + 1;
  }

  /** 启动自动播放 */
  function startAutoplay() {
    if (props.autoplay && itemsCount.value > 1) {
      stopAutoplay();
      intervalId = setInterval(
        props.direction === 'next' ? next : prev,
        props.interval,
      );
    }
  }

  /** 停止自动播放 */
  function stopAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  /** 监听鼠标悬停停止播放 */
  function addHoverListeners() {
    const carouselEl = carousel.value;
    if (!carouselEl) return;
    carouselEl.addEventListener('mouseenter', stopAutoplay);
    carouselEl.addEventListener('mouseleave', startAutoplay);
  }

  onBeforeUnmount(() => {
    stopAutoplay();
    const carouselEl = carousel.value;
    if (carouselEl) {
      carouselEl.removeEventListener('mouseenter', stopAutoplay);
      carouselEl.removeEventListener('mouseleave', startAutoplay);
    }
  });

  onMounted(() => {
    startAutoplay();
    addHoverListeners();
  });

  watch(realIndex, (newVal) => emit('change', newVal));

  return {
    prev,
    next,
    goTo,
    items,
    itemsCount,
    totalItemsCount,
    currentIndex,
    realIndex,
    carousel,
    containerInner,
    transformStyle,
    transition,
    useTransition,
  };
}
