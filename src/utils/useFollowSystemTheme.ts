// composables/useFollowSystemTheme.ts
import {nextTick, onMounted, onUnmounted, ref} from 'vue';

/**
 * 跟随系统主题变化，支持手动 toggle
 * 自动为 body 添加/移除 dark-mode 类
 * 手动切换后退出“跟随系统”模式
 */
export function useFollowSystemTheme() {
    const isDark = ref(false);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // 用于标记是否应继续监听系统主题
    let shouldFollowSystem = true;

    const updateTheme = (e?: MediaQueryListEvent) => {
        if (!shouldFollowSystem) return; // 手动切换后不再响应系统变化

        const dark = e ? e.matches : mediaQuery.matches;
        isDark.value = dark;
        document.body.classList.toggle('dark-mode', dark);
    };

    const start = () => {
        updateTheme(); // 初始化
        mediaQuery.addEventListener('change', updateTheme);
        console.log('启动主题监听');
    };

    const stop = () => {
        shouldFollowSystem = false;
        mediaQuery.removeEventListener('change', updateTheme);
    };

    /**
     * 手动切换主题
     * 一旦调用，将退出“跟随系统”模式
     */
    const toggle = () => {
        // 第一次手动切换：停止跟随系统
        if (shouldFollowSystem) {
            stop(); // 停止监听系统变化
        }

        // 切换主题
        isDark.value = !isDark.value;
        document.body.classList.toggle('dark-mode', isDark.value);

        // 持久化用户选择
        localStorage.setItem('preferred-theme', isDark.value ? 'dark' : 'light');
    };

    // 初始化：读取 localStorage，优先使用用户选择
    const saved = localStorage.getItem('preferred-theme');
    if (saved) {
        shouldFollowSystem = false; // 用户曾手动选择，不再跟随系统
        isDark.value = saved === 'dark';
        // 注意：这里不立即设置 class，start() 里会统一处理
    } else {
        // 跟随系统
        isDark.value = mediaQuery.matches;
    }

    onMounted(() => {
        nextTick(() => {
            // 设置初始 class
            document.body.classList.toggle('dark-mode', isDark.value);
            // 只有在“跟随系统”时才监听
            if (shouldFollowSystem) {
                start();
            }
        });
    });

    onUnmounted(() => {
        if (shouldFollowSystem) {
            stop();
        }
    });

    return {
        isDark,     // 当前是否为深色模式
        stop,       // 强制停止监听（一般不需要手动调）
        toggle,     // 手动切换主题
    };
}