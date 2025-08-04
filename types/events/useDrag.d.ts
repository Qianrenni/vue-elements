/**
 * 拖拽逻辑钩子
 * 功能：封装元素的拖拽和点击逻辑，支持动态绑定和清理事件监听
 * @param elementRef 目标元素的引用
 * @param onMove 移动事件的回调函数（可选）
 * @param interval 节流间隔（毫秒）
 * @param threshold 移动阈值（像素）
 * @returns 返回一个包含清理方法 `destroy` 的对象
 */
export declare const useDrag: (elementRef: HTMLElement, onMove?: () => void, interval?: number, threshold?: number) => {
    /**
     * 清理函数
     * - 移除所有事件监听
     */
    destroy: () => void;
};
