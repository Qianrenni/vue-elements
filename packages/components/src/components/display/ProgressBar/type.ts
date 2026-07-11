/**
 * ProgressBar 组件 Props
 */
export interface ProgressBarProps {
  /** 进度百分比，如 '30%' */
  percent: string;
  /** 进度条颜色，默认 'var(--primary-color)' */
  color?: string;
  /** 进度条方向，默认 'horizontal' */
  direction?: 'horizontal' | 'vertical';
}
