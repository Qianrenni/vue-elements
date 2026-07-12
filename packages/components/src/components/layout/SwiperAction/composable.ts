import { ref, onMounted, nextTick, type Ref } from 'vue';
import type { SwiperActionProps, SwiperActionEmits } from './type';

/**
 * SwiperAction 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @param innerRef 内部容器模板引用
 * @returns translateX、onStart、onMove、onMouseMove、onEnd
 */
export const useSwiperAction = (
  props: SwiperActionProps,
  emit: SwiperActionEmits,
  innerRef: Readonly<Ref<HTMLElement | null>>,
): {
  translateX: Ref<number>;
  onStart: (e: TouchEvent | MouseEvent) => void;
  onMove: (e: TouchEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onEnd: () => void;
} => {
  const translateX = ref(0);
  const startX = ref(0);
  const currentX = ref(0);
  const isDragging = ref(false);
  const isTouchDevice = ref(false);
  const actionWidth = ref(0);

  // 自动获取右侧操作区宽度
  onMounted(async () => {
    await nextTick();
    if (innerRef.value?.children?.[1]) {
      actionWidth.value = innerRef.value.children[1].clientWidth || 0;
    }
  });

  const onStart = (e: TouchEvent | MouseEvent) => {
    if (props.disabled) return;
    isTouchDevice.value = e.type.startsWith('touch');
    const clientX = isTouchDevice.value
      ? (e as TouchEvent).touches[0].clientX
      : (e as MouseEvent).clientX;
    startX.value = clientX;
    currentX.value = translateX.value;
    isDragging.value = true;
  };

  const onMove = (e: TouchEvent) => {
    if (!isDragging.value || props.disabled) return;
    const clientX = e.touches[0].clientX;
    const diff = clientX - startX.value;
    let newTranslate = currentX.value + diff;

    // 限制：不能右滑（>0），不能左滑超过 action 宽度
    if (newTranslate > 0) newTranslate = 0;
    if (newTranslate < -actionWidth.value) newTranslate = -actionWidth.value;

    translateX.value = newTranslate;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || props.disabled || isTouchDevice.value) return;
    const clientX = e.clientX;
    const diff = clientX - startX.value;
    let newTranslate = currentX.value + diff;

    if (newTranslate > 0) newTranslate = 0;
    if (newTranslate < -actionWidth.value) newTranslate = -actionWidth.value;

    translateX.value = newTranslate;
  };

  const onEnd = () => {
    if (!isDragging.value) return;
    isDragging.value = false;

    if (actionWidth.value <= 0) {
      translateX.value = 0;
      return;
    }

    if (Math.abs(translateX.value) >= (props.threshold ?? 50)) {
      // 完全展开
      translateX.value = -actionWidth.value;
      emit('swipe');
      emit('update:open', true);
    } else {
      // 回弹关闭
      translateX.value = 0;
      emit('update:open', false);
    }
  };

  return { translateX, onStart, onMove, onMouseMove, onEnd };
};
