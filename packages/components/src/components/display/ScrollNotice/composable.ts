import {
  onBeforeUnmount,
  onMounted,
  watch,
  nextTick,
  useTemplateRef,
} from 'vue';
import { useWindowResize } from '@/utils';
import type { ScrollNoticeProps } from './type';

/**
 * useScrollNotice - 滚动通知组件核心逻辑
 *
 * 处理文本从右向左无限滚动的动画逻辑，包括：
 * - requestAnimationFrame 驱动滚动动画
 * - 窗口尺寸变化时自动重启动画
 * - speed 属性变化时自动重启动画
 *
 * @param props - ScrollNoticeProps
 */
export function useScrollNotice(props: ScrollNoticeProps) {
  const scrollRef = useTemplateRef<HTMLElement>('scrollRef');
  const noticeRef = useTemplateRef<HTMLElement>('noticeRef');

  let textWidth = 0;
  let translateX = 0;
  let animationFrameId: number | null = null;
  let parentWidth = 0;

  /** 动画驱动函数 */
  const animate = () => {
    translateX -= props.speed ?? 1;

    // 当文本完全移出左侧时，重置到右侧起点
    if (translateX <= -textWidth) {
      translateX = parentWidth;
    }

    // 直接更新 transform
    if (noticeRef.value) {
      noticeRef.value.style.transform = `translateX(${translateX}px)`;
    }

    animationFrameId = requestAnimationFrame(animate);
  };

  /** 初始化/重启动画 */
  const startAnimation = () => {
    // 清除旧动画
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    nextTick(() => {
      textWidth = noticeRef.value?.offsetWidth || 0;
      parentWidth = scrollRef.value?.offsetWidth || 0;
      // 重置初始位置：从容器右侧外部开始
      translateX = parentWidth;
      // 启动新动画（确保尺寸更新后再开始）
      animationFrameId = requestAnimationFrame(animate);
    });
  };

  onMounted(() => {
    startAnimation();
    useWindowResize.addHandler(startAnimation);
  });

  onBeforeUnmount(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    useWindowResize.removeHandler(startAnimation);
  });

  // speed 变化时重启动画
  watch(
    () => props.speed,
    () => {
      startAnimation();
    },
  );

  return {
    scrollRef,
    noticeRef,
  };
}
