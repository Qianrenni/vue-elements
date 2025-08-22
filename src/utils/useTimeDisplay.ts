// composables/useTimeDisplay.ts

import {onMounted, onUnmounted, ref, Ref} from 'vue';
import {_padd, UseTimeUtils} from './useTime';

// ========================
// 全局共享 _padd（与 UseTimeUtils 一致）
// ========================

// ========================
// 配置选项
// ========================
export interface UseTimeDisplayOptions {
    locale?: string;           // 本地化语言，默认 'zh-CN'
    autoStart?: boolean;       // 是否自动启动，默认 true
    interval?: number;         // 更新间隔，默认 1000ms
    onFinish?: () => void;     // 倒计时结束回调
    mode?: 'auto' | 'countdown' | 'format' | 'realtime'; // 模式控制
}

/**
 * Vue 3 Composable：统一的时间显示工具
 * 支持三种模式：
 *  - 倒计时（目标时间在未来）
 *  - 格式化显示（目标时间在过去）
 *  - 实时时间（无目标时间）
 *
 * @param source 可选时间源（Date | string | number），undefined 表示当前实时时间
 * @param format 格式化字符串
 *        - 若包含 {DD}{HH}{mm}{ss} → 视为倒计时模板
 *        - 否则视为普通格式（如 'YYYY-MM-DD'）
 * @param options 配置项
 * @returns Ref<string> 响应式时间字符串
 *
 * @example
 * // 自动判断：未来 → 倒计时，过去 → 格式化
 * const time = useTimeDisplay('2025-12-31', '{DD}天{HH}小时{mm}分{ss}秒');
 * // 实时时间
 * const now = useTimeDisplay(undefined, 'HH:mm:ss');
 */
export function useTimeDisplay(
    source?: Date | string | number,
    format: string = 'YYYY-MM-DD HH:mm:ss',
    options: UseTimeDisplayOptions = {}
): Ref<string> {
    const {
        locale = 'zh-CN',
        autoStart = true,
        interval = 1000,
        onFinish,
        mode: userMode
    } = options;

    const formatted = ref<string>('');
    let timer: ReturnType<typeof setInterval> | null = null;

    // 判断是否为倒计时模板
    const isCountdownFormat = /{DD}|{HH}|{mm}|{ss}/.test(format);
    // 判断是否为实时时间（无 source）
    const isRealtime = source === undefined;
    // 解析目标时间（如果 source 存在）
    let targetTime: number | null = null;

    if (source !== undefined) {
        const utils = new UseTimeUtils(source);
        targetTime = utils.valueOf();
        if (isNaN(targetTime)) {
            console.warn('[useTimeDisplay] Invalid source time:', source);
            targetTime = null;
        }
    }

    // ========================
    // 模式判断
    // ========================
    let mode: 'realtime' | 'countdown' | 'formatted';

    if (userMode) {
        mode = userMode as any;
    } else if (isRealtime) {
        mode = 'realtime';
    } else if (targetTime && isCountdownFormat) {
        const now = Date.now();
        mode = targetTime > now ? 'countdown' : 'formatted';
    } else {
        mode = 'formatted';
    }

    // ========================
    // 更新函数
    // ========================
    const update = () => {
        const now = Date.now();

        if (mode === 'realtime') {
            // 实时时间：每秒更新
            const nowUtils = UseTimeUtils.now(locale);
            formatted.value = nowUtils.format(format);
        } else if (mode === 'countdown' && targetTime) {
            const remaining = targetTime - now;
            if (remaining <= 0) {
                formatted.value = formatDuration(0);
                stop();
                onFinish?.();
                // 可选：结束后切换为“已结束”文本，或保持 00:00:00
            } else {
                formatted.value = formatDuration(remaining);
            }
        } else if (mode === 'formatted' && targetTime) {
            // 格式化过去时间
            const utils = new UseTimeUtils(targetTime, locale);
            formatted.value = utils.format(format);
        }
    };

    // ========================
    // 倒计时专用：格式化剩余时间
    // ========================
    const formatDuration = (ms: number): string => {
        if (ms <= 0) {
            return format
                .replace(/{DD}/g, '00')
                .replace(/{HH}/g, '00')
                .replace(/{mm}/g, '00')
                .replace(/{ss}/g, '00');
        }

        const totalSeconds = Math.floor(ms / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return format
            .replace(/{DD}/g, _padd[Math.min(days, 99)])
            .replace(/{HH}/g, _padd[hours])
            .replace(/{mm}/g, _padd[minutes])
            .replace(/{ss}/g, _padd[seconds]);
    };

    // ========================
    // 控制方法
    // ========================
    const start = () => {
        if (timer) return;
        update();
        if (mode === 'realtime' || mode === 'countdown') {
            timer = setInterval(update, interval);
        }
    };

    const stop = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };

    // const reset = (newSource?: Date | string | number, newFormat?: string) => {
    //     if (newFormat) format = newFormat;
    //     source = newSource;
    //
    //     // 重新解析 targetTime
    //     if (source !== undefined) {
    //         const utils = new UseTimeUtils(source);
    //         targetTime = utils.valueOf();
    //     } else {
    //         targetTime = null;
    //     }
    //
    //     // 重新判断 mode
    //     if (userMode) {
    //         mode = userMode as any;
    //     } else if (source === undefined) {
    //         mode = 'realtime';
    //     } else if (targetTime && isCountdownFormat) {
    //         mode = targetTime > Date.now() ? 'countdown' : 'formatted';
    //     } else {
    //         mode = 'formatted';
    //     }
    //
    //     update();
    //     if ((mode === 'realtime' || mode === 'countdown') && autoStart && !timer) {
    //         start();
    //     }
    // };

    // ========================
    // 生命周期
    // ========================
    onMounted(() => {
        update();
        if (autoStart && (mode === 'realtime' || mode === 'countdown')) {
            start();
        }
    });

    onUnmounted(stop);

    // ========================
    // 返回响应式变量
    // ========================
    return formatted;
}
