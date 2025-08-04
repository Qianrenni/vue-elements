import {throttleUtil} from "@/utils";

/**
 * 拖拽逻辑钩子
 * 功能：封装元素的拖拽和点击逻辑，支持动态绑定和清理事件监听
 * @param elementRef 目标元素的引用
 * @param onMove 移动事件的回调函数（可选）
 * @param interval 节流间隔（毫秒）
 * @param threshold 移动阈值（像素）
 * @returns 返回一个包含清理方法 `destroy` 的对象
 */
export const useDrag = (elementRef: HTMLElement, onMove?: () => void, interval = 16, threshold = 10) => {
    interval = interval > 16 ? interval : 16;
    // 拖拽状态标志
    let isDragging = false;
    // 记录鼠标按下时的初始坐标
    let startY = 0;
    let startX = 0;
    // 记录元素初始位置（bottom/right）
    let startBottom = 0;
    let startRight = 0;
    let isMove = false;
    /**
     * 拖拽中
     * - 计算鼠标移动的偏移量（dy/dx）
     * - 更新元素位置（bottom/right）
     */
    const drag = (e: MouseEvent) => {
        if (!isDragging) return;
        const dy = startY - e.clientY;
        const dx = startX - e.clientX;
        if (Math.abs(dx) >= threshold || Math.abs(dx) <= threshold) {
            isMove = true;
        }
        elementRef.style.bottom = `${startBottom + dy}px`;
        elementRef.style.right = `${startRight + dx}px`;
        onMove?.();
    };
    const throttleDrag = throttleUtil(drag, interval);
    /**
     * 开始拖拽
     * - 记录鼠标按下时的坐标和元素初始位置
     * - 禁用文本选择（避免拖拽时选中文本）
     * - 绑定鼠标移动和松开事件
     */
    const startDrag = (e: MouseEvent) => {
        isDragging = true;
        isMove = false;
        startY = e.clientY;
        startX = e.clientX;
        startBottom = parseInt(getComputedStyle(elementRef).bottom, 10) || 0;
        startRight = parseInt(getComputedStyle(elementRef).right, 10) || 0;
        document.body.style.userSelect = "none";
        document.removeEventListener("mousemove", throttleDrag);
        document.removeEventListener("mouseup", stopDrag);
        document.addEventListener("mousemove", throttleDrag);
        document.addEventListener("mouseup", stopDrag);
    };
    /**
     * 停止拖拽
     * - 重置拖拽状态
     * - 恢复文本选择
     * - 移除鼠标移动和松开事件
     */
    const stopDrag = () => {
        isDragging = false;
        document.body.style.userSelect = "";
        document.removeEventListener("mousemove", throttleDrag);
        document.removeEventListener("mouseup", stopDrag);
    };

    // 绑定拖拽和点击事件
    elementRef?.addEventListener("mousedown", startDrag);

    // 返回清理方法
    return {
        /**
         * 清理函数
         * - 移除所有事件监听
         */
        destroy: () => {
            elementRef?.removeEventListener("mousedown", startDrag);
            document.removeEventListener("mousemove", throttleDrag);
            document.removeEventListener("mouseup", stopDrag);
        },
    };
};
