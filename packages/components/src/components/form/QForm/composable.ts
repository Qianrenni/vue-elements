import type { QFormRule } from './type';

/** 是否视为“缺失” */
export function isMissing(value: unknown, whitespace = false): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === 'string') {
    if (whitespace) return value.trim() === '';
    return value === '';
  }
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/** 判断是否超长/超短（数字比较大小，其余比较 length） */
function compareLength(
  value: unknown,
  target: number,
  kind: 'min' | 'max' | 'len',
): boolean {
  const size =
    typeof value === 'number'
      ? value
      : Array.isArray(value) || typeof value === 'string'
        ? value.length
        : 0;
  if (kind === 'min') return size < target;
  if (kind === 'max') return size > target;
  return size !== target;
}

/** 默认提示 */
export function defaultMessage(rule: QFormRule, field?: string): string {
  const label = field ? `「${field}」` : '';
  if (rule.required) return `${label}为必填项`;
  if (rule.pattern) return `${label}格式不正确`;
  if (rule.min !== undefined && rule.max !== undefined)
    return `${label}长度/数值需在 ${rule.min} ~ ${rule.max}`;
  if (rule.min !== undefined) return `${label}长度/数值不能小于 ${rule.min}`;
  if (rule.max !== undefined) return `${label}长度/数值不能大于 ${rule.max}`;
  if (rule.len !== undefined) return `${label}长度需为 ${rule.len}`;
  return '校验不通过';
}

/**
 * 执行单条规则
 * @returns 失败信息或 null
 */
export async function validateRule(
  rule: QFormRule,
  value: unknown,
  model: Record<string, unknown>,
  field?: string,
): Promise<string | null> {
  if (rule.required && isMissing(value, rule.whitespace)) {
    return rule.message ?? defaultMessage(rule, field);
  }
  if (!isMissing(value)) {
    if (
      rule.pattern &&
      typeof value === 'string' &&
      !rule.pattern.test(value)
    ) {
      return rule.message ?? defaultMessage(rule, field);
    }
    if (rule.len !== undefined && compareLength(value, rule.len, 'len')) {
      return rule.message ?? defaultMessage(rule, field);
    }
    if (rule.min !== undefined && compareLength(value, rule.min, 'min')) {
      return rule.message ?? defaultMessage(rule, field);
    }
    if (rule.max !== undefined && compareLength(value, rule.max, 'max')) {
      return rule.message ?? defaultMessage(rule, field);
    }
  }
  if (rule.validator) {
    const result = await rule.validator(value, model);
    if (result === false) return rule.message ?? defaultMessage(rule, field);
    if (typeof result === 'string') return result;
  }
  return null;
}

/**
 * 依次执行规则，返回第一条失败信息
 */
export async function validateRules(
  rules: QFormRule[] | undefined,
  value: unknown,
  model: Record<string, unknown>,
  field?: string,
): Promise<string | null> {
  if (!rules || rules.length === 0) return null;
  for (const rule of rules) {
    const msg = await validateRule(rule, value, model, field);
    if (msg !== null) return msg;
  }
  return null;
}
