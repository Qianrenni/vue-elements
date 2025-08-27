export type MessageType = 'success' | 'warning' | 'error' | 'info';

export interface MessageOptions {
    message: string;
    type?: MessageType;
    duration?: number;
    onClose?: () => void;
}