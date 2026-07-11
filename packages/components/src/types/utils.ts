export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type DeepNonNullable<T> = {
  [P in keyof T]-?: DeepNonNullable<T[P]>;
};
export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<T[P]>;
};
export type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>;
};
