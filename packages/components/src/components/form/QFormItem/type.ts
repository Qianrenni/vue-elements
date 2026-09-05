import type { QFormRule, QFormValidateTrigger } from '../QForm/type';

/** QFormItem 组件 Props */
export interface QFormItemProps {
  /**
   * @property name
   * @defaultValue 无
   * @description 对应 model 中的字段名
   */
  name?: string;
  /**
   * @property label
   * @defaultValue 无
   * @description 标签文案
   */
  label?: string;
  /**
   * @property rules
   * @defaultValue 无
   * @description 该字段校验规则（优先于 QForm 全局 rules）
   */
  rules?: QFormRule[];
  /**
   * @property required
   * @defaultValue 无
   * @description 是否必填（可覆盖 rules 推导，仅影响红星/提示）
   */
  required?: boolean;
  /**
   * @property validateTrigger
   * @defaultValue 无
   * @description 校验触发（缺省用 QForm 的默认值）
   */
  validateTrigger?: QFormValidateTrigger;
}
