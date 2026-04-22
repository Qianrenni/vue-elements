/**
 * 节流函数
 * @param func 需要节流的函数
 * @param interval 节流间隔（毫秒）
 * @returns 节流后的函数
 */
export const useThrottle = <T extends (...args: any[]) => any>(
    func: T,
    interval: number = 16, // 默认 16ms（约 60fps）
): ((...args: Parameters<T>) => void) => {
    let lastTime = 0;
    return function (this: any, ...args: Parameters<T>): void {
        const now = Date.now();
        if (now - lastTime >= interval) {
            func.apply(this, args);
            lastTime = now;
        }
    };
};