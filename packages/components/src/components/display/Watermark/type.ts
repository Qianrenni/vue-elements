/** 水印字体配置 */
export interface QWatermarkFont {
  /** 字体颜色 */
  color?: string;
  /** 字号(px) */
  fontSize?: number;
  /** 字重 */
  fontWeight?: number | string;
  /** 字体族 */
  fontFamily?: string;
}

/** QWatermark 组件 Props */
export interface QWatermarkProps {
  /**
   * @property content
   * @defaultValue 无
   * @description 水印文本：单行字符串或多行字符串数组；为空则不渲染
   */
  content?: string | string[];
  /**
   * @property gap
   * @defaultValue [100, 100]
   * @description 水印间距 [水平, 垂直]（px）
   */
  gap?: [number, number];
  /**
   * @property offset
   * @defaultValue [0, 0]
   * @description 首个水印相对容器偏移 [x, y]（px）
   */
  offset?: [number, number];
  /**
   * @property rotate
   * @defaultValue -22
   * @description 水印旋转角度（deg）
   */
  rotate?: number;
  /**
   * @property font
   * @defaultValue { color: 'rgba(0,0,0,0.12)', fontSize: 16 }
   * @description 字体配置
   */
  font?: QWatermarkFont;
  /**
   * @property zIndex
   * @defaultValue 1
   * @description 水印层 z-index（需低于交互内容或保持 pointer-events none）
   */
  zIndex?: number;
}
