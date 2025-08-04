export interface Options {
    label: string;
    value: string;
}
export type FormSize = 'small' | 'middle' | 'large';
export type FormStatus = 'default' | 'success' | 'warning' | 'error';
export interface FormComponentProps<T> {
    modelValue?: T | null;
    name?: string;
    label?: string;
    disabled?: boolean;
    readonly?: boolean;
    size?: FormSize;
    status?: FormStatus;
    required?: boolean;
    placeholder?: string;
    clearable?: boolean;
    autofocus?: boolean;
    id?: string;
    direction?: 'vertical' | 'horizontal';
    errorMessage?: string;
}
export interface FormComponentEmits<T> {
    (e: 'update:modelValue', value: T): void;
    (e: 'change', value: T): void;
    (e: 'focus', event: FocusEvent): void;
    (e: 'blur', event: FocusEvent): void;
    (e: 'input', value: T, event: InputEvent | Event): void;
    (e: 'clear'): void;
}
export interface FormComponentSlots<T> {
    prefix?: (props: {
        value: T;
    }) => any;
    suffix?: (props: {
        value: T;
    }) => any;
    clear?: () => any;
    error?: (props: {
        error: string;
    }) => any;
    default?: () => any;
}
