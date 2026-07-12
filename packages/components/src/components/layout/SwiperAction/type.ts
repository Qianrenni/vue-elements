/**
 * SwiperAction 组件 Props
 */
export interface SwiperActionProps {
  /** 是否禁用滑动 */
  disabled?: boolean;
  /** 触发滑动的阈值（px） */
  threshold?: number;
}

/**
 * SwiperAction 组件 Emits
 */
export interface SwiperActionEmits {
  (e: 'swipe'): void;
  (e: 'update:open', open: boolean): void;
}
