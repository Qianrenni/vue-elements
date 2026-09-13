/** 滑块区间值：[左值, 右值] */
export type RangeSliderValue = [number, number];

/** QRangeSlider 组件 Props */
export interface QRangeSliderProps {
  /**
   * @property value
   * @defaultValue [0, 100]
   * @description 当前区间值（v-model:value），形如 [左值, 右值]
   */
  value?: RangeSliderValue;
  /**
   * @property min
   * @defaultValue 0
   * @description 最小值
   */
  min?: number;
  /**
   * @property max
   * @defaultValue 100
   * @description 最大值
   */
  max?: number;
  /**
   * @property step
   * @defaultValue 1
   * @description 步进值，需大于 0
   */
  step?: number;
  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @property tooltip
   * @defaultValue true
   * @description 是否在滑块上方展示当前数值
   */
  tooltip?: boolean;
  /**
   * @property marks
   * @defaultValue 无
   * @description 刻度标记，键为刻度值，值为刻度文案
   */
  marks?: Record<number, string>;
  /**
   * @property vertical
   * @defaultValue false
   * @description 是否垂直方向展示
   */
  vertical?: boolean;
}

/** QRangeSlider 组件 Emits */
export interface QRangeSliderEmits {
  /**
   * @property update:value
   * @description 区间值变化时触发（v-model:value）
   */
  (e: 'update:value', value: RangeSliderValue): void;
  /**
   * @property change
   * @description 拖动过程中区间值变化时触发
   */
  (e: 'change', value: RangeSliderValue): void;
  /**
   * @property afterChange
   * @description 拖动结束（松开滑块）时触发
   */
  (e: 'afterChange', value: RangeSliderValue): void;
}
