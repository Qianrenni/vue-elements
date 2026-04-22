// composables/useTimeDisplay.ts

import {ref} from 'vue';
import {handleDateFormat, UseTimeUtils} from './useTimeUtils';


// 配置选项
export interface UseTimeDisplayOptions {
    autoStart?: boolean;       // 是否自动启动，默认 true
    interval?: number;         // 更新间隔，默认 1000ms
    onFinish?: () => void;     // 倒计时结束回调
    mode?: 'countdown'| 'realtime'; // 模式控制
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
 *        - 若包含DDHHmmss → 视为倒计时模板
 *        - 否则视为普通格式（如 'YYYY-MM-DD'）
 * @param options 配置项
 * @returns Ref<string> 响应式时间字符串
 *
 * @example
 * const time = useTimeDisplay('2025-12-31', 'DD天HH小时mm分ss秒', {mode: 'countdown'});
 * // 实时时间
 * const now = useTimeDisplay(undefined, 'HH:mm:ss');
 */
export function useTimeDisplay(
    source?: Date | string | number,
    format: string = 'YYYY-MM-DD HH:mm:ss',
    options: UseTimeDisplayOptions = {}
){
    const {
        interval = 1000,
        onFinish,
        mode ='realtime',
    } = options;

    const result = ref<string>(format);
    let timer: ReturnType<typeof setInterval> | null = null;
    const {temp,p} = handleDateFormat(format, 'DHms');
    // 解析目标时间（如果 source 存在）
    let targetTime: number | null = null;

    if (source !== undefined) {
        const utils = new UseTimeUtils(source);
        targetTime = utils.valueOf();
        if (isNaN(targetTime)) {
            console.error('[useTimeDisplay] Invalid source time:', source);
            targetTime = null;
        }
    }
    // 更新函数
    const update = () => {
        const nowUtils = new UseTimeUtils();
        if (mode === 'realtime') {
            result.value = nowUtils.format(format);
        } else if (mode === 'countdown' && targetTime) {
            let remaining = targetTime - nowUtils.valueOf();
            if (remaining <= 0) {
                result.value = format.replace(/(Y|M|D|H|h|m|s|S|d)+/g, '0');
                stop();
                onFinish?.();
            } else {
                let seconds = 0;
                let minutes = 0;
                let hours = 0;
                let days = 0;
                if(format.includes('D')){
                    days = Math.floor(remaining / (1000 * 60 * 60 * 24));
                    remaining = remaining % (1000 * 60 * 60 * 24);
                }
                if(format.includes('H')){
                    hours = Math.floor(remaining / (1000 * 60 * 60));
                    remaining = remaining % (1000 * 60 * 60);
                }
                if(format.includes('m')){
                    minutes = Math.floor(remaining / (1000 * 60));
                    remaining = remaining % (1000 * 60);
                }
                if(format.includes('s')){
                    seconds = Math.floor(remaining / 1000);
                }
                result.value = temp
                    .replace('D', days.toString().padStart(p.get('D') || 0, '0'))
                    .replace('H', hours.toString().padStart(p.get('H') || 0, '0'))
                    .replace('m', minutes.toString().padStart(p.get('m') || 0, '0'))
                    .replace('s', seconds.toString().padStart(p.get('s') || 0, '0'));
            }
        }
    };

    // 控制方法
    const start = () => {
        if (timer) return;
        update();
        timer = setInterval(update, interval);
    };

    const stop = () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    };
    return {
        value:result,
        start,
        stop,
    }
}
