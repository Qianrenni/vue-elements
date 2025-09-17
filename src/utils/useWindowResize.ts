/**
 * 存储所有注册的窗口尺寸变化处理器的栈
 * 每个处理器接收当前窗口的宽度和高度作为参数
 */
const resizeHandlerStack: ((width: number, height: number) => void)[] = [];

/**
 * 标记是否已绑定 window resize 事件监听器
 * 避免重复绑定
 */
let isListening = false;

/**
 * 窗口 resize 事件的统一处理函数
 * 被触发时，遍历所有注册的处理器并传入当前窗口尺寸
 */
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 遍历调用所有注册的处理器
    resizeHandlerStack.forEach(handler => handler(width, height));
}

/**
 * 组合式函数：用于监听窗口尺寸变化
 * 提供添加和移除处理器的方法，自动管理事件监听器的绑定/解绑
 */
export const useWindowResize = {
    /**
     * 添加一个窗口尺寸变化处理器
     * @param handler - 处理函数，接收 (width: number, height: number) 作为参数
     *
     * 首次调用时会自动绑定 window 的 resize 事件监听器
     */
    addHandler(handler: (width: number, height: number) => void): void {
        // 将处理器加入栈中
        resizeHandlerStack.push(handler);

        // 如果尚未监听 resize 事件，则绑定监听器
        if (!isListening) {
            window.addEventListener('resize', handleResize, {passive: true});
            isListening = true;
            // 立即触发一次，让新注册的处理器能获取当前尺寸
            handleResize();
        }
    },

    /**
     * 移除一个已注册的窗口尺寸变化处理器
     * @param handler - 要移除的处理函数（必须是原函数引用）
     *
     * 当最后一个处理器被移除时，自动解绑事件监听器，避免内存泄漏
     */
    removeHandler(handler: (width: number, height: number) => void): void {
        const index = resizeHandlerStack.indexOf(handler);
        if (index !== -1) {
            resizeHandlerStack.splice(index, 1);
        }

        // 如果没有处理器了，移除事件监听器
        if (resizeHandlerStack.length === 0 && isListening) {
            window.removeEventListener('resize', handleResize);
            isListening = false;
        }
    },

    /**
     * （可选）获取当前已注册的处理器数量，便于调试
     */
    getHandlerCount(): number {
        return resizeHandlerStack.length;
    },

    /**
     * （可选）强制触发一次 resize 事件处理（例如用于初始化或手动刷新）
     */
    triggerResize(): void {
        if (resizeHandlerStack.length > 0) {
            handleResize();
        }
    }
};