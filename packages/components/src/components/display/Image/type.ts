import type { CSSProperties } from 'vue';

/** 图片适配方式（CSS object-fit） */
export type QImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

/** QImage 组件 Props */
export interface QImageProps {
  /**
   * @property src
   * @defaultValue 无
   * @description 图片地址
   */
  src?: string;
  /**
   * @property alt
   * @defaultValue ''
   * @description 图片替代文本
   */
  alt?: string;
  /**
   * @property width
   * @defaultValue 无
   * @description 缩略图宽度（number=px 或 CSS 长度）
   */
  width?: string | number;
  /**
   * @property height
   * @defaultValue 无
   * @description 缩略图高度（number=px 或 CSS 长度）
   */
  height?: string | number;
  /**
   * @property fit
   * @defaultValue 'fill'
   * @description 图片适配方式（object-fit）
   */
  fit?: QImageFit;
  /**
   * @property preview
   * @defaultValue true
   * @description 是否可点击放大预览
   */
  preview?: boolean;
  /**
   * @property previewSrc
   * @defaultValue src
   * @description 预览大图地址（缺省用 src）
   */
  previewSrc?: string;
  /**
   * @property fallback
   * @defaultValue 无
   * @description 加载失败时替换显示的图片地址
   */
  fallback?: string;
  /**
   * @property previewOpen
   * @defaultValue 无
   * @description 预览受控开关（v-model:preview-open）
   */
  previewOpen?: boolean;
  /**
   * @property imageStyle
   * @defaultValue 无
   * @description 缩略图 <img> 自定义样式
   */
  imageStyle?: CSSProperties;
}

/** QImage 组件 Emits */
export interface QImageEmits {
  /**
   * @property update:previewOpen
   * @description 预览开合变化时触发（配合 v-model:preview-open）
   */
  (e: 'update:previewOpen', open: boolean): void;
  /**
   * @property preview-change
   * @description 预览打开/关闭时触发
   */
  (e: 'preview-change', open: boolean): void;
  /**
   * @property error
   * @description 图片加载失败时触发
   */
  (e: 'error', event: Event): void;
}
