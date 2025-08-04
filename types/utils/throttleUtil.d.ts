/**
 * 节流函数
 * @param func 需要节流的函数
 * @param interval 节流间隔（毫秒）
 * @returns 节流后的函数
 */
export declare const throttleUtil: <T extends (...args: any[]) => any>(func: T, interval?: number) => ((...args: Parameters<T>) => void);
