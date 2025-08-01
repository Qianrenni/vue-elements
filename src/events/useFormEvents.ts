// utils/useFormEvents.ts

import {FormComponentEmits} from "@/types";

/**
 * 为表单组件创建通用事件处理器
 * @param emit defineEmits 的返回函数
 * @returns 一组预绑定 emit 的事件处理函数
 */
export function useFormEvents<T>(emit: FormComponentEmits<T>) {
    return {
        /**
         * 处理 input 事件（值变化 + emit）
         */
        handleInput(event: InputEvent | Event, parse: (e: InputEvent | Event) => T) {
            const value = parse(event)
            emit('update:modelValue', value as T)
            emit('input', value, event)
        },

        /**
         * 处理 change 事件
         */
        handleChange(event: Event, parse: (e: Event) => T) {
            const value = parse(event)
            emit('change', value as T)
        },

        /**
         * 处理 focus
         */
        handleFocus(event: FocusEvent) {
            emit('focus', event)
        },

        /**
         * 处理 blur
         */
        handleBlur(event: FocusEvent) {
            emit('blur', event)
        },

        /**
         * 处理 clear
         */
        handleClear(clearValue: T) {
            emit('update:modelValue', clearValue as T)
            emit('clear')
        }
    }
}