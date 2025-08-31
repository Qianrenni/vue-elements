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