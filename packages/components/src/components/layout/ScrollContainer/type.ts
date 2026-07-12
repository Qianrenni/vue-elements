/**
 * ScrollContainer 组件 Props
 */
export interface ScrollContainerProps {
  /** 是否监听水平滚动 */
  scrollX?: boolean;
  /** 是否监听垂直滚动 */
  scrollY?: boolean;
  /** 滚动到边界的阈值（px） */
  threshold?: number;
  /** 滚动事件触发间隔（ms） */
  emitInterval?: number;
  /** 是否可恢复滚动位置 */
  recoverable?: boolean;
  /** 用于恢复滚动位置的 key */
  name?: string;
}

/**
 * ScrollContainer 组件 Emits
 */
export interface ScrollContainerEmits {
  (e: 'ended'): void;
  (e: 'scroll', scroll: { x: number; y: number }): void;
}

/**
 * 滚动位置选项
 */
export interface ScrollToOptions {
  left?: number;
  top?: number;
  behavior?: 'smooth' | 'auto' | 'instant';
}
