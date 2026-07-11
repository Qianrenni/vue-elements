export type MessageType = 'success' | 'warning' | 'error' | 'info';

/**
 * Message 组件 Props
 */
export interface MessageProps {
  /** 消息内容文本 */
  message: string;
  /** 消息类型，决定样式颜色 */
  type: MessageType;
}
