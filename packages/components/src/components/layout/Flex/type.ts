/** QFlex 主轴方向 */
export type QFlexJustify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

/** QFlex 交叉轴对齐 */
export type QFlexAlign =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'stretch'
  | 'baseline';

/** QFlex 间距档位 */
export type QFlexGap = number | 'small' | 'middle' | 'large' | string;

/** QFlex 组件 Props */
export interface QFlexProps {
  /**
   * @property vertical
   * @defaultValue false
   * @description 主轴是否为纵向（column）
   */
  vertical?: boolean;
  /**
   * @property wrap
   * @defaultValue false
   * @description 是否换行
   */
  wrap?: boolean;
  /**
   * @property justify
   * @defaultValue 'flex-start'
   * @description 主轴对齐方式
   */
  justify?: QFlexJustify;
  /**
   * @property align
   * @defaultValue 'flex-start'
   * @description 交叉轴对齐方式
   */
  align?: QFlexAlign;
  /**
   * @property gap
   * @defaultValue 'middle'
   * @description 间距：small/middle/large 或数字(px)/CSS 长度
   */
  gap?: QFlexGap;
  /**
   * @property flex
   * @defaultValue 无
   * @description 本容器的 CSS flex 简写（作为父级 flex 子项时生效）
   */
  flex?: number | string;
  /**
   * @property tag
   * @defaultValue 'div'
   * @description 渲染的 HTML 标签
   */
  tag?: string;
}
