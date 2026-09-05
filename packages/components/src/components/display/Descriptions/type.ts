import type { CSSProperties } from 'vue';

/** 描述布局 */
export type QDescriptionLayout = 'horizontal' | 'vertical';

/** 描述尺寸 */
export type QDescriptionSize = 'small' | 'middle' | 'large';

/** 描述项 */
export interface QDescriptionItem {
  /**
   * @property key
   * @defaultValue 索引
   * @description 项唯一标识（用作 #<key> 内容插槽名）
   */
  key?: string;
  /**
   * @property label
   * @defaultValue 无
   * @description 标签文案
   */
  label?: string;
  /**
   * @property content
   * @defaultValue 无
   * @description 内容文案（可用 #<key> 插槽覆盖）
   */
  content?: string;
  /**
   * @property span
   * @defaultValue 1
   * @description 占据的列数（1 ~ column）
   */
  span?: number;
}

/** QDescriptions 组件 Props */
export interface QDescriptionsProps {
  /**
   * @property title
   * @defaultValue 无
   * @description 标题（也可用 #title 插槽）
   */
  title?: string;
  /**
   * @property items
   * @defaultValue []
   * @description 描述项配置
   */
  items?: QDescriptionItem[];
  /**
   * @property column
   * @defaultValue 3
   * @description 一行显示项数（1 ~ 4 常用，任意正整数）
   */
  column?: number;
  /**
   * @property layout
   * @defaultValue 'horizontal'
   * @description 布局：horizontal（标签在内容左侧）/ vertical（标签在上方）
   */
  layout?: QDescriptionLayout;
  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small / middle / large
   */
  size?: QDescriptionSize;
  /**
   * @property bordered
   * @defaultValue false
   * @description 是否显示边框
   */
  bordered?: boolean;
  /**
   * @property colon
   * @defaultValue true
   * @description 是否在标签后显示冒号（horizontal 布局有效）
   */
  colon?: boolean;
  /**
   * @property labelStyle
   * @defaultValue 无
   * @description 标签自定义样式
   */
  labelStyle?: CSSProperties;
  /**
   * @property contentStyle
   * @defaultValue 无
   * @description 内容自定义样式
   */
  contentStyle?: CSSProperties;
}
