/** 主轴对齐方式（justify-content） */
export type RowJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

/** 交叉轴对齐方式（align-items） */
export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch';

/** QRow 组件 Props（对齐 Ant Design Row） */
export interface RowProps {
  /**
   * @property gutter
   * @defaultValue 0
   * @description 栅格间距：数字(px)；或 [水平, 垂直] 数组
   */
  gutter?: number | [number, number];

  /**
   * @property justify
   * @defaultValue 'start'
   * @description 主轴对齐：start/end/center/space-between/space-around/space-evenly
   */
  justify?: RowJustify;

  /**
   * @property align
   * @defaultValue 'top'
   * @description 交叉轴对齐：top/middle/bottom/stretch
   */
  align?: RowAlign;

  /**
   * @property wrap
   * @defaultValue true
   * @description 是否允许换行
   */
  wrap?: boolean;
}
