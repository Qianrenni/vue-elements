/**
 * Loading 组件动画类型
 */
export type LoadingType = 'breathing' | 'spinner' | 'skeleton';

/**
 * Loading 组件 Props
 */
export interface LoadingProps {
  /** 加载动画类型，默认 'breathing' */
  type?: LoadingType;
  /** 是否显示加载状态，默认 true */
  show?: boolean;
  /** 加载提示文字 */
  text?: string;
}
