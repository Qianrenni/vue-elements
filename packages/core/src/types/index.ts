/**
 * 将对象类型的属性递归设为可选，数组元素同样递归处理。
 *
 * @template T - 要转换的原始对象类型。
 */
export type DeepPartial<T> = T extends (infer Item)[]
  ? DeepPartial<Item>[]
  : T extends object
    ? { [Key in keyof T]?: DeepPartial<T[Key]> }
    : T;

/**
 * 将对象类型的属性递归设为只读。
 *
 * @template T - 要转换的原始对象类型。
 */
export type DeepReadonly<T> = {
  readonly [Key in keyof T]: DeepReadonly<T[Key]>;
};

/**
 * 将对象类型的属性递归设为非空且必填。
 *
 * @template T - 要转换的原始对象类型。
 */
export type DeepNonNullable<T> = {
  [Key in keyof T]-?: DeepNonNullable<T[Key]>;
};

/**
 * 将对象类型的属性递归设为必填。
 *
 * @template T - 要转换的原始对象类型。
 */
export type DeepRequired<T> = {
  [Key in keyof T]-?: DeepRequired<T[Key]>;
};

/**
 * 将对象类型的属性递归移除只读修饰。
 *
 * @template T - 要转换的原始对象类型。
 */
export type DeepMutable<T> = {
  -readonly [Key in keyof T]: DeepMutable<T[Key]>;
};
