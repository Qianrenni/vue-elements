
export function setupDrag(elementRef: HTMLElement, onClick?: () => void) {
    let isDragging = false;
    let startY = 0;
    let startBottom = 0;
    let startX = 0;
    let startRight = 0;
    let isOffset = false;

    const clickHandler = () => {
        if (!isOffset && onClick) {
            onClick();
        } else {
            isOffset = false;
        }
    };

    const startDrag = (e: MouseEvent) => {
        isDragging = true;
        startY = e.clientY;
        startX = e.clientX;
        startBottom = parseInt(getComputedStyle(elementRef).bottom, 10) || 0;
        startRight = parseInt(getComputedStyle(elementRef).right, 10) || 0;
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    };

    const drag = (e: MouseEvent) => {
        if (!isDragging) return;
        const dy = startY - e.clientY;
        const dx = startX - e.clientX;
        isOffset = true;
        elementRef.style.bottom = `${startBottom + dy}px`;
        elementRef.style.right = `${startRight + dx}px`;
    };

    const stopDrag = () => {
        isDragging = false;
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    };

    elementRef.addEventListener('mousedown', startDrag);
    elementRef.addEventListener('click', clickHandler);

    return {
        destroy: () => {
            elementRef.removeEventListener('mousedown', startDrag);
            elementRef.removeEventListener('click', clickHandler);
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        },
    };
}
