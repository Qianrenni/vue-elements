import type { InjectionKey, Ref } from 'vue';

import type { QFormRule } from './type';

/** QForm 注入给 QFormItem 的上下文 */
export interface QFormContext {
  /** 表单数据对象（响应式 ref，供读取最新值） */
  modelRef: Ref<Record<string, unknown>>;
  /** 字段错误信息 */
  errors: Record<string, string>;
  /** 布局：horizontal/vertical */
  layout: 'horizontal' | 'vertical';
  /** label 宽度 */
  labelWidth: number | string;
  /** label 对齐 */
  labelAlign: 'left' | 'right';
  /** 默认校验触发 */
  validateTrigger: 'change' | 'blur';
  /** 获取某字段的校验规则 */
  getRules: (name: string) => QFormRule[] | undefined;
  /** 校验单个字段（注册过或带规则） */
  validateField: (name: string) => Promise<boolean>;
  /** 清除某字段错误 */
  clearField: (name: string) => void;
  /** 注册字段 */
  registerField: (name: string) => void;
  /** 注销字段 */
  unregisterField: (name: string) => void;
}

/** provide/inject 用的 key */
export const Q_FORM_KEY: InjectionKey<QFormContext> = Symbol('q-form');
