import { FormComponentEmits } from "@/types";
/**
 * 为表单组件创建通用事件处理器
 * @param emit defineEmits 的返回函数
 * @returns 一组预绑定 emit 的事件处理函数
 */
export declare function useFormEvents<T>(emit: FormComponentEmits<T>): {
    /**
     * 处理 input 事件（值变化 + emit）
     */
    handleInput(event: InputEvent | Event, parse: (e: InputEvent | Event) => T): void;
    /**
     * 处理 change 事件
     */
    handleChange(event: Event, parse: (e: Event) => T): void;
    /**
     * 处理 focus
     */
    handleFocus(event: FocusEvent): void;
    /**
     * 处理 blur
     */
    handleBlur(event: FocusEvent): void;
    /**
     * 处理 clear
     */
    handleClear(clearValue: T): void;
};
