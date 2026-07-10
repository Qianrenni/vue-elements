export type MessageType = 'success' | 'warning' | 'error' | 'info';

export interface MessageOptions {
  // 消息内容
  message: string;
  // 消息类型
  type?: MessageType;
  // 显示时间
  duration?: number;
  // 关闭回调函数
  onClose?: () => void;
}
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
