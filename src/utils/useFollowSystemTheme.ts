// composables/useFollowSystemTheme.ts
import {nextTick, onMounted, onUnmounted, ref} from 'vue';

/**
 * 跟随系统主题变化，自动为 body 添加/移除 dark-mode 类
 * 返回当前是否为深色模式的响应式变量
 */
export function useFollowSystemTheme() {
    const isDark = ref(false);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = (e?: MediaQueryListEvent) => {
        const dark = e ? e.matches : mediaQuery.matches;
        isDark.value = dark;
        document.body.classList.toggle('dark-mode', dark);
    };

    // 初始化并绑定监听
    const start = () => {
        updateTheme(); // 初始化
        mediaQuery.addEventListener('change', updateTheme);
        console.log('启动主题监听');
    };

    // 清理监听
    const stop = () => {
        mediaQuery.removeEventListener('change', updateTheme);
    };

    // 兼容非组件环境（如 main.ts），也兼容组件环境
    if (typeof onMounted === 'function') {
        onMounted(() => {
            // 使用 nextTick 确保 DOM 已准备
            nextTick(() => {
                start();
            });
        });

        onUnmounted(() => {
            stop();
        });
    } else {
        // 非 Vue 组件环境（如 main.ts 中直接调用），直接启动
        start();
    }

    return {
        isDark,     // 响应式：是否为深色模式
        stop,       // 可手动停止监听
    };
}