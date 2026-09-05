/** QMentions 候选项 */
export interface QMentionsOption {
  /** 值 */
  value: string;
  /** 显示文案（缺省用 value） */
  label?: string;
  /** 是否禁用 */
  disabled?: boolean;
}

/** QMentions 组件 Props */
export interface QMentionsProps {
  /**
   * @property modelValue
   * @defaultValue ''
   * @description 文本值（v-model，含 @提及 的完整文本）
   */
  modelValue?: string;
  /**
   * @property options
   * @defaultValue []
   * @description 候选列表
   */
  options?: QMentionsOption[];
  /**
   * @property prefix
   * @defaultValue '@'
   * @description 触发前缀（单个字符）
   */
  prefix?: string;
  /**
   * @property placeholder
   * @defaultValue '请输入，@ 提及'
   * @description 占位文案
   */
  placeholder?: string;
  /**
   * @property disabled
   * @defaultValue false
   * @description 禁用
   */
  disabled?: boolean;
  /**
   * @property rows
   * @defaultValue 3
   * @description textarea 行数
   */
  rows?: number;
  /**
   * @property autoSize
   * @defaultValue false
   * @description 是否随内容自适应高度
   */
  autoSize?: boolean;
  /**
   * @property open
   * @defaultValue 无
   * @description 受控展开候选（v-model:open）
   */
  open?: boolean;
}

/** QMentions 组件 Emits */
export interface QMentionsEmits {
  /**
   * @property update:modelValue
   * @description 输入或选择候选时输出
   */
  (e: 'update:modelValue', value: string): void;
  /**
   * @property change
   * @description 值变化时触发
   */
  (e: 'change', value: string): void;
  /**
   * @property update:open
   * @description 候选展开状态变化
   */
  (e: 'update:open', open: boolean): void;
}
