import type { FormSize } from '@/types';

/** 刻度标记：{ [位置]: 文本 } */
export type SliderMarks = Record<number, string>;

/** QSlider 组件 Props（对齐 Ant Design Slider 单值能力） */
export interface SliderProps {
  /**
   * @property modelValue
   * @defaultValue 0
   * @description 当前值（支持 v-model）
   */
  modelValue?: number;

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
   * @description 步长；0 表示自由取值
   */
  step?: number;

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;

  /**
   * @property marks
   * @defaultValue 无
   * @description 刻度标记 { [值]: 文本 }
   */
  marks?: SliderMarks;

  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small / middle / large
   */
  size?: FormSize;
}

/** QSlider 组件 Emits */
export interface SliderEmits {
  /**
   * @property update:modelValue
   * @description 拖动/点击/键盘变化时触发（拖动过程持续触发）
   */
  (e: 'update:modelValue', value: number): void;

  /**
   * @property change
   * @description 值变化提交（鼠标释放/键盘）时触发
   */
  (e: 'change', value: number): void;
}
