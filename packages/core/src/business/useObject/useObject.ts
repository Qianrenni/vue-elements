import type { DeepPartial } from '@/types';

export function isPlainObject(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

// 3. 深度合并函数
export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: DeepPartial<T>,
): T {
  // 克隆 base，避免修改原对象
  const result: Record<string, unknown> = { ...base };
  const baseRecord = base as Record<string, unknown>;
  const overrideRecord = override as Record<string, unknown>;

  for (const key of Object.keys(overrideRecord)) {
    const overrideVal = overrideRecord[key];
    const baseVal = baseRecord[key];

    // 如果 overrideVal 是 undefined，跳过（保留 base 的值）
    if (overrideVal === undefined) continue;

    // 如果 base 和 override 对应位置都是纯对象，则递归合并
    if (isPlainObject(overrideVal) && isPlainObject(baseVal)) {
      result[key] = deepMerge(baseVal, overrideVal);
    } else {
      // 否则（叶子节点、数组、null 等），直接用 override 覆盖
      result[key] = overrideVal;
    }
  }

  return result as T;
}
