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
        handleInput(value: T) {
            emit('update:modelValue', value)
            emit('input', value)
        },

        /**
         * 处理 change 事件
         */
        handleChange(value: T) {
            emit('update:modelValue', value)
            emit('change', value)
        },

        /**
         * 处理 focus
         */
        handleFocus() {
            emit('focus')
        },

        /**
         * 处理 blur
         */
        handleBlur() {
            emit('blur')
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