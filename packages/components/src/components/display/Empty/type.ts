import type { CSSProperties } from 'vue';

/** 空状态插画预设 */
export type EmptyPreset = 'default' | 'simple';

/** QEmpty 组件 Props（对齐 Ant Design Empty） */
export interface EmptyProps {
  /**
   * @property description
   * @defaultValue '暂无数据'
   * @description 描述文案（也可用 description 插槽覆盖）
   */
  description?: string;

  /**
   * @property preset
   * @defaultValue 'default'
   * @description 插画预设：default（默认插画）/ simple（简洁细线图标）
   */
  preset?: EmptyPreset;

  /**
   * @property imageStyle
   * @defaultValue 无
   * @description 图片容器自定义样式
   */
  imageStyle?: CSSProperties;
}
