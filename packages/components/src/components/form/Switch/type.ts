/** QSwitch 组件 Props */
export interface QSwitchProps {
  /**
   * @property value
   * @defaultValue false
   * @description 开关状态（v-model:value）
   */
  value?: boolean;
  /**
   * @property disabled
   * @defaultValue false
   * @description 是否禁用
   */
  disabled?: boolean;
  /**
   * @property loading
   * @defaultValue false
   * @description 是否加载中（加载中不可切换）
   */
  loading?: boolean;
  /**
   * @property size
   * @defaultValue 'default'
   * @description 尺寸：small 小号 / default 默认
   */
  size?: 'small' | 'default';
  /**
   * @property checkedChildren
   * @defaultValue 无
   * @description 打开时的文字提示
   */
  checkedChildren?: string;
  /**
   * @property unCheckedChildren
   * @defaultValue 无
   * @description 关闭时的文字提示
   */
  unCheckedChildren?: string;
  /**
   * @property autofocus
   * @defaultValue false
   * @description 是否自动聚焦
   */
  autofocus?: boolean;
}

/** QSwitch 组件 Emits */
export interface QSwitchEmits {
  /**
   * @property update:value
   * @description 开关状态变化时触发（v-model:value）
   */
  (e: 'update:value', value: boolean): void;
  /**
   * @property change
   * @description 开关状态变化时触发
   */
  (e: 'change', value: boolean): void;
}
