/**
 * Carousel 组件 Props
 */
export interface CarouselProps {
  /** 是否垂直显示 */
  vertical?: boolean;
  /** 是否自动播放 */
  autoplay?: boolean;
  /** 过渡持续时间（ms），默认 500 */
  duration?: number;
  /** 是否显示指示器 */
  indicator?: boolean;
  /** 指示器位置 */
  indicatorPosition?:
    | 'center-bottom'
    | 'center-top'
    | 'left-bottom'
    | 'left-top'
    | 'left-center'
    | 'right-bottom'
    | 'right-top'
    | 'right-center';
  /** 轮播宽度（px） */
  width: number;
  /** 轮播高度（px） */
  height: number;
  /** 自动播放间隔（ms），默认 1500 */
  interval?: number;
  /** 自动播放方向 */
  direction?: 'next' | 'prev';
  /** 是否显示切换按钮 */
  showButton?: boolean;
  /** 是否循环播放 */
  loop?: boolean;
  /** 是否支持触摸滑动 */
  touchMove?: boolean;
}

/**
 * Carousel 组件 Emits
 */
export interface CarouselEmits {
  (e: 'change', index: number): void;
}
