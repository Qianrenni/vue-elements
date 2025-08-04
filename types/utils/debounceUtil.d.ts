/**
 * 防抖函数
 * @param func 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 返回一个防抖后的函数
 */
export declare const debounceUtil: <T extends (...args: any[]) => any>(func: T, delay: number) => (...args: Parameters<T>) => void;
