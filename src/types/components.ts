export interface TreeNodeData {
    id: string | number
    label: string
    children?: TreeNodeData[]
    expanded?: boolean
    selected?: boolean
    disabled?: boolean
}

export interface Options {
    label: string;
    value: string;
}

export type FormSize = 'small' | 'middle' | 'large'
export type FormStatus = 'default' | 'success' | 'warning' | 'error'

export interface FormComponentProps<T> {
    // v-model 绑定值（可选，支持 null）
    modelValue?: T | null

    // 表单项名称（用于表单提交）
    name?: string

    // label 文本
    label?: string

    // 是否禁用
    disabled?: boolean

    // 是否只读（主要用于原生输入控件）
    readonly?: boolean

    // 尺寸
    size?: FormSize

    // 状态（用于边框颜色、校验反馈）
    status?: FormStatus

    // 是否必填（视觉星号提示）
    required?: boolean

    // 占位符
    placeholder?: string

    // 是否可清空（显示 × 按钮）
    clearable?: boolean

    // 自动聚焦
    autofocus?: boolean

    // 唯一标识，用于 label 关联和 a11y
    id?: string

    // 竖向排列化石还是横向
    direction?: 'vertical' | 'horizontal'
    //
    errorMessage?: string
}

// 所有表单组件 emit 的事件
export interface FormComponentEmits<T> {
    // v-model
    (e: 'update:modelValue', value: T): void

    // 值变化（可用于验证）
    (e: 'change', value: T): void

    // 聚焦
    (e: 'focus'): void

    // 失焦
    (e: 'blur'): void

    // 输入中（input 事件）
    (e: 'input', value: T): void

    // 清空操作
    (e: 'clear'): void
}

// 所有表单组件支持的插槽
export interface FormComponentSlots<T> {
    // 前缀图标/文本
    prefix?: (props: { value: T }) => any

    // 后缀图标/文本
    suffix?: (props: { value: T }) => any

    // 清空按钮（可自定义）
    clear?: () => any

    // 错误信息区域
    error?: (props: { error: string }) => any

    // 默认插槽（用于复杂内容）
    default?: () => any
}
