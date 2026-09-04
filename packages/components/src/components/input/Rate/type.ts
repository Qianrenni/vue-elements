/** QRate 组件 Props（对齐 Ant Design Rate） */
export interface RateProps {
  /**
   * @property modelValue
   * @defaultValue 0
   * @description 当前评分（0 ~ count，支持 v-model）
   */
  modelValue?: number;

  /**
   * @property count
   * @defaultValue 5
   * @description 星星总数
   */
  count?: number;

  /**
   * @property allowHalf
   * @defaultValue false
   * @description 是否允许半星
   */
  allowHalf?: boolean;

  /**
   * @property allowClear
   * @defaultValue true
   * @description 再次点击同一值是否清除（置 0）
   */
  allowClear?: boolean;

  /**
   * @property disabled
   * @defaultValue false
   * @description 是否只读（禁用交互）
   */
  disabled?: boolean;

  /**
   * @property character
   * @defaultValue '★'
   * @description 自定义字符（也可用 character 插槽覆盖整颗星）
   */
  character?: string;
}

/** QRate 组件 Emits */
export interface RateEmits {
  /**
   * @property update:modelValue
   * @description 评分变化时触发
   */
  (e: 'update:modelValue', value: number): void;

  /**
   * @property change
   * @description 评分变化时触发
   */
  (e: 'change', value: number): void;

  /**
   * @property hoverChange
   * @description 悬停预览值变化时触发
   */
  (e: 'hoverChange', value: number): void;
}
