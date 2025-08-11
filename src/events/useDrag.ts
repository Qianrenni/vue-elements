import {useThrottle} from "@/utils";

/**
 * 拖拽逻辑钩子（基于 Pointer Events + setPointerCapture）
 * 功能：封装元素的拖拽逻辑，避免绑定事件到 document
 * @param elementRef 目标元素的引用
 * @param onMove 移动事件的回调函数（可选）
 * @param interval 节流间隔（毫秒）
 * @param threshold 移动阈值（像素）
 * @returns 返回一个包含清理方法 `destroy` 的对象
 */
export const useDrag = (
    elementRef: HTMLElement,
    onMove?: () => void,
    interval = 16,
    threshold = 10
) => {
    interval = interval > 16 ? interval : 16;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startBottom = 0;
    let startRight = 0;
    let isMove = false;

    // 节流后的 pointermove 回调
    const drag = (e: PointerEvent) => {
        if (!isDragging) return;

        const dx = startX - e.clientX;
        const dy = startY - e.clientY;

        // 判断是否达到移动阈值
        if (!isMove && (Math.abs(dx) >= threshold || Math.abs(dy) >= threshold)) {
            isMove = true;
        }

        // 更新元素位置
        elementRef.style.bottom = `${startBottom + dy}px`;
        elementRef.style.right = `${startRight + dx}px`;

        onMove?.();
    };

    const throttleDrag = useThrottle(drag, interval);

    // pointerdown：开始拖拽
    const startDrag = (e: PointerEvent) => {
        // 只处理主按键（鼠标左键）或触摸/触控笔
        if (e.button !== 0 && e.pointerType === "mouse") return;

        isDragging = true;
        isMove = false;

        startX = e.clientX;
        startY = e.clientY;

        const computedStyle = getComputedStyle(elementRef);
        startBottom = parseInt(computedStyle.bottom, 10) || 0;
        startRight = parseInt(computedStyle.right, 10) || 0;

        // 设置指针捕获
        elementRef.setPointerCapture(e.pointerId);

        // 禁止文本选中
        document.body.style.userSelect = "none";

        // 绑定事件到 elementRef 本身（不需要绑定到 document）
        elementRef.addEventListener("pointermove", throttleDrag);
    };

    // pointerup / pointercancel：结束拖拽
    const stopDrag = (e: PointerEvent) => {
        if (!isDragging) return;

        isDragging = false;

        // 释放指针捕获
        try {
            elementRef.releasePointerCapture(e.pointerId);
        } catch (err) {
            // 可能已被自动释放（如 pointerup 会自动释放），忽略错误
        }

        // 清理事件监听
        elementRef.removeEventListener("pointermove", throttleDrag);

        // 恢复文本选中
        document.body.style.userSelect = "";

    };

    // 绑定 pointer 事件
    elementRef.addEventListener("pointerdown", startDrag);
    elementRef.addEventListener("pointerup", stopDrag);
    elementRef.addEventListener("pointercancel", stopDrag); // 触摸中断等情况

    // 返回销毁函数
    return {
        destroy: () => {
            elementRef.removeEventListener("pointerdown", startDrag);
            elementRef.removeEventListener("pointerup", stopDrag);
            elementRef.removeEventListener("pointercancel", stopDrag);
            if (isDragging) {
                // 强制释放捕获
                try {
                    elementRef.releasePointerCapture((elementRef as any).__activePointerId || 0);
                } catch (e) {
                }
                elementRef.removeEventListener("pointermove", throttleDrag);
            }
            document.body.style.userSelect = "";
        },
    };
};
