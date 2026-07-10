// composables/useFollowSystemTheme.ts
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

/**
 * 跟随系统主题变化，支持手动 toggle
 * 自动为 body 添加/移除 dark-mode 类
 * 手动切换后退出"跟随系统"模式
 *
 * 采用单例模式，所有调用方共享同一份主题状态
 */

/* ===== 模块级共享状态（单例） ===== */
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = ref(false);

let shouldFollowSystem = true;
let mountedCount = 0;

const updateTheme = (e?: MediaQueryListEvent) => {
  if (!shouldFollowSystem) return;
  const dark = e ? e.matches : mediaQuery.matches;
  isDark.value = dark;
  document.body.classList.toggle('dark-mode', dark);
};

const startListening = () => {
  mediaQuery.addEventListener('change', updateTheme);
};

const stopListening = () => {
  mediaQuery.removeEventListener('change', updateTheme);
};

/**
 * 手动切换主题
 * 一旦调用，将退出"跟随系统"模式
 */
const toggle = () => {
  if (shouldFollowSystem) {
    shouldFollowSystem = false;
    stopListening();
  }
  isDark.value = !isDark.value;
  document.body.classList.toggle('dark-mode', isDark.value);
  localStorage.setItem('preferred-theme', isDark.value ? 'dark' : 'light');
};

/* ===== 模块级初始化 ===== */
const saved = localStorage.getItem('preferred-theme');
if (saved) {
  shouldFollowSystem = false;
  isDark.value = saved === 'dark';
} else {
  isDark.value = mediaQuery.matches;
}

/* ===== Composable 入口 ===== */
export function useFollowSystemTheme() {
  onMounted(() => {
    mountedCount++;
    nextTick(() => {
      document.body.classList.toggle('dark-mode', isDark.value);
      if (shouldFollowSystem && mountedCount === 1) {
        startListening();
      }
    });
  });

  onUnmounted(() => {
    mountedCount--;
    if (mountedCount <= 0 && shouldFollowSystem) {
      stopListening();
    }
  });

  return {
    /** 当前是否为深色模式 */
    isDark,
    /** 手动切换主题 */
    toggle,
  };
}
