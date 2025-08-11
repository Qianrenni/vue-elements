import {useThrottle} from "@/utils";

/**
 * @param elementRef 目标元素的引用
 * @param onMove 移动事件的回调函数（可选）
 * @param interval 节流间隔（毫秒）
 * @param threshold 移动阈值（像素）
 * @returns 返回一个包含清理方法 `destroy` 的对象, 以及是否移动的标志 `isMove`
 */
export const useDrag = (elementRef: HTMLElement, onMove?: () => void, interval = 16, threshold = 10) => {
    interval = interval > 16 ? interval : 16;

    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let startBottom = 0;
    let startRight = 0;
    let isMove = false;
    let downTarget: EventTarget | null = null; // 记录 pointerdown 时的实际目标

    const updatePosition = (e: PointerEvent) => {
        const dx = startX - e.clientX;
        const dy = startY - e.clientY;
        elementRef.style.bottom = `${startBottom + dy}px`;
        elementRef.style.right = `${startRight + dx}px`;
        onMove?.();
    };

    const throttleDrag = useThrottle(updatePosition, interval);

    const rawDrag = (e: PointerEvent) => {
        if (!isDragging) return;

        const dx = startX - e.clientX;
        const dy = startY - e.clientY;
        const distance = Math.hypot(dx, dy);

        if (!isMove && distance >= threshold) {
            isMove = true;
        }

        throttleDrag(e);
    };

    const startDrag = (e: PointerEvent) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;

        isDragging = true;
        isMove = false;

        startX = e.clientX;
        startY = e.clientY;

        const computedStyle = getComputedStyle(elementRef);
        startBottom = parseInt(computedStyle.bottom, 10) || 0;
        startRight = parseInt(computedStyle.right, 10) || 0;

        // 记录原始点击目标（可能是子元素）
        downTarget = e.target;

        elementRef.setPointerCapture(e.pointerId);
        document.body.style.userSelect = 'none';

        elementRef.addEventListener('pointermove', rawDrag);
    };

    const stopDrag = (e: PointerEvent) => {
        if (!isDragging) return;

        const didMove = isMove;
        isDragging = false;

        try {
            elementRef.releasePointerCapture(e.pointerId);
        } catch (err) {
            console.error('Failed to release pointer capture:', err);
        }

        elementRef.removeEventListener('pointermove', rawDrag);
        document.body.style.userSelect = '';

        // 如果没有拖动，尝试恢复原始点击行为
        if (!didMove && downTarget instanceof Element) {
            // 创建一个真实的 click 事件
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                detail: 1,
                button: 0,
                clientX: e.clientX,
                clientY: e.clientY,
                screenX: e.screenX,
                screenY: e.screenY,
            });

            // 在原始目标上派发 click
            downTarget.dispatchEvent(clickEvent);
        }

        // 重置 downTarget
        downTarget = null;
    };

    elementRef.addEventListener('pointerdown', startDrag);
    elementRef.addEventListener('pointerup', stopDrag);
    elementRef.addEventListener('pointercancel', stopDrag);

    return {
        destroy: () => {
            elementRef.removeEventListener('pointerdown', startDrag);
            elementRef.removeEventListener('pointerup', stopDrag);
            elementRef.removeEventListener('pointercancel', stopDrag);
            if (isDragging) {
                elementRef.removeEventListener('pointermove', rawDrag);
                try {
                    elementRef.releasePointerCapture((elementRef as any).__activePointerId || 0);
                } catch (error) {
                    console.error('Failed to release pointer capture:', error);
                }
            }
            document.body.style.userSelect = '';
        },
        isMove: () => isMove,
    };
};
