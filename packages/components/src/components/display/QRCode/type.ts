/** 纠错等级 */
export type QQRCodeErrorLevel = 'L' | 'M' | 'Q' | 'H';

/** QQRCode 组件 Props */
export interface QQRCodeProps {
  /**
   * @property value
   * @defaultValue ''
   * @description 二维码内容（文本/URL）；为空时不渲染码
   */
  value?: string;
  /**
   * @property size
   * @defaultValue 160
   * @description 二维码尺寸（px，宽高一致）
   */
  size?: number;
  /**
   * @property color
   * @defaultValue '#000000'
   * @description 码点颜色
   */
  color?: string;
  /**
   * @property bgColor
   * @defaultValue 'transparent'
   * @description 背景色
   */
  bgColor?: string;
  /**
   * @property errorLevel
   * @defaultValue 'M'
   * @description 纠错等级：L / M / Q / H（H 容错最高）
   */
  errorLevel?: QQRCodeErrorLevel;
  /**
   * @property padding
   * @defaultValue 4
   * @description 空白边距（单位：模块数）
   */
  padding?: number;
  /**
   * @property icon
   * @defaultValue 无
   * @description 中心图标图片地址
   */
  icon?: string;
  /**
   * @property iconSize
   * @defaultValue 0.25*size
   * @description 中心图标尺寸（px）；缺省为 size 的 1/4
   */
  iconSize?: number;
}
