/**
 * LazyImage 组件 Props
 */
export interface LazyImageProps {
  /** 图片地址 */
  src: string;
  /** 图片替代文本 */
  alt?: string;
  /** 容器宽度，默认 100% */
  width?: string | number;
  /** 容器高度，默认 100% */
  height?: string | number;
}
