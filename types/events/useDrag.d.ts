/**
 * @param elementRef 目标元素的引用
 * @param onMove 移动事件的回调函数（可选）
 * @param interval 节流间隔（毫秒）
 * @param threshold 移动阈值（像素）
 * @returns 返回一个包含清理方法 `destroy` 的对象, 以及是否移动的标志 `isMove`
 */
export declare const useDrag: (elementRef: HTMLElement, onMove?: () => void, interval?: number, threshold?: number) => {
    destroy: () => void;
    isMove: () => boolean;
};
