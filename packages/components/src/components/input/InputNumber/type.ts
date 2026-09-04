import type { FormSize } from '@/types';

/** QInputNumber 组件 Props（对齐 Ant Design InputNumber） */
export interface InputNumberProps {
  /**
   * @property modelValue
   * @defaultValue 无
   * @description 当前值（支持 v-model；可为 null 表示空）
   */
  modelValue?: number | null;

  /**
   * @property min
   * @defaultValue -Infinity
   * @description 最小值
   */
  min?: number;

  /**
   * @property max
   * @defaultValue Infinity
   * @description 最大值
   */
  max?: number;

  /**
   * @property step
   * @defaultValue 1
   * @description 步长
   */
  step?: number;

  /**
   * @property precision
   * @defaultValue 无
   * @description 保留小数位数（>0 时按四舍五入格式化显示）
   */
  precision?: number;

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;

  /**
   * @property controls
   * @defaultValue true
   * @description 是否显示增减按钮
   */
  controls?: boolean;

  /**
   * @property size
   * @defaultValue 'middle'
   * @description 尺寸：small / middle / large
   */
  size?: FormSize;

  /**
   * @property placeholder
   * @defaultValue 无
   * @description 占位文本
   */
  placeholder?: string;
}

/** QInputNumber 组件 Emits */
export interface InputNumberEmits {
  /**
   * @property update:modelValue
   * @description 值变化时触发
   */
  (e: 'update:modelValue', value: number | null): void;

  /**
   * @property change
   * @description 值提交变化（失焦/步进）时触发
   */
  (e: 'change', value: number | null): void;

  /**
   * @property focus
   * @description 聚焦时触发
   */
  (e: 'focus', ev: FocusEvent): void;

  /**
   * @property blur
   * @description 失焦时触发
   */
  (e: 'blur', ev: FocusEvent): void;
}
