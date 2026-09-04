import type { CSSProperties } from 'vue';

/** 数值类型：数字或可被 Number() 解析的字符串 */
export type StatisticValueType = number | string;

/** QStatistic 组件 Props（对齐 Ant Design Statistic） */
export interface StatisticProps {
  /**
   * @property title
   * @defaultValue 无
   * @description 数值标题
   */
  title?: string;

  /**
   * @property value
   * @defaultValue 无
   * @description 数值内容
   */
  value?: StatisticValueType;

  /**
   * @property precision
   * @defaultValue 无
   * @description 数值精度（小数位数）；缺省时不强制小数
   */
  precision?: number;

  /**
   * @property groupSeparator
   * @defaultValue ','
   * @description 千分位分组分隔符（传空字符串禁用）
   */
  groupSeparator?: string;

  /**
   * @property decimalSeparator
   * @defaultValue '.'
   * @description 小数点分隔符
   */
  decimalSeparator?: string;

  /**
   * @property prefix
   * @defaultValue 无
   * @description 前缀文本（如 ¥）
   */
  prefix?: string;

  /**
   * @property suffix
   * @defaultValue 无
   * @description 后缀文本（如 %）
   */
  suffix?: string;

  /**
   * @property valueStyle
   * @defaultValue 无
   * @description 数值样式（覆盖颜色/字号等）
   */
  valueStyle?: CSSProperties;

  /**
   * @property countUp
   * @defaultValue false
   * @description 数值变化时是否滚动动画
   */
  countUp?: boolean;

  /**
   * @property countDuration
   * @defaultValue 2000
   * @description 滚动动画时长（毫秒）
   */
  countDuration?: number;

  /**
   * @property loading
   * @defaultValue false
   * @description 加载中占位（显示 —）
   */
  loading?: boolean;
}
