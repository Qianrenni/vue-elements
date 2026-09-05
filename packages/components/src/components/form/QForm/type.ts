/** 校验触发时机 */
export type QFormValidateTrigger = 'change' | 'blur';

/** 校验规则 */
export interface QFormRule {
  /**
   * 是否必填（空字符串/空数组/null/undefined 视为缺失）
   */
  required?: boolean;
  /**
   * 校验失败提示
   */
  message?: string;
  /**
   * 正则匹配
   */
  pattern?: RegExp;
  /**
   * 数字最小值，或字符串/数组最小长度
   */
  min?: number;
  /**
   * 数字最大值，或字符串/数组最大长度
   */
  max?: number;
  /**
   * 精确长度
   */
  len?: number;
  /**
   * 字符串是否仅空白也算缺失（配合 required）
   */
  whitespace?: boolean;
  /**
   * 自定义校验：返回 true 通过、false/string 失败（可返回 Promise）
   */
  validator?: (
    value: unknown,
    model: Record<string, unknown>,
  ) => boolean | string | Promise<boolean | string>;
}

/** 字段规则表（key 为字段名） */
export type QFormRules = Record<string, QFormRule[]>;

/** QForm 组件 Props */
export interface QFormProps {
  /**
   * @property model
   * @defaultValue 无
   * @description 表单数据对象（各字段由子 QFormItem 的 name 读取）
   */
  model?: Record<string, unknown>;
  /**
   * @property rules
   * @defaultValue 无
   * @description 全局校验规则（字段名 → 规则数组）
   */
  rules?: QFormRules;
  /**
   * @property labelWidth
   * @defaultValue '100px'
   * @description label 宽度（horizontal 布局）
   */
  labelWidth?: number | string;
  /**
   * @property layout
   * @defaultValue 'horizontal'
   * @description 布局：horizontal 标签在左 / vertical 标签在上
   */
  layout?: 'horizontal' | 'vertical';
  /**
   * @property labelAlign
   * @defaultValue 'left'
   * @description label 对齐方式
   */
  labelAlign?: 'left' | 'right';
  /**
   * @property validateTrigger
   * @defaultValue 'blur'
   * @description 字段默认校验触发（可被 QFormItem 覆盖）
   */
  validateTrigger?: QFormValidateTrigger;
}

/** QForm 组件 Emits */
export interface QFormEmits {
  /**
   * @property finish
   * @description 提交校验通过
   */
  (e: 'finish', values: Record<string, unknown>): void;
  /**
   * @property finish-failed
   * @description 提交校验失败
   */
  (
    e: 'finish-failed',
    values: Record<string, unknown>,
    errors: Record<string, string>,
  ): void;
}

/** QForm 暴露方法 */
export interface QFormExpose {
  /** 校验全部字段，返回是否通过 */
  validate: () => Promise<boolean>;
  /** 校验单个字段 */
  validateField: (name: string) => Promise<boolean>;
  /** 清除校验状态 */
  clearValidate: (name?: string) => void;
  /** 重置字段为初始值并清除校验 */
  resetFields: () => void;
  /** 获取某字段值 */
  getFieldValue: (name: string) => unknown;
  /** 当前错误表 */
  errors: Record<string, string>;
}
