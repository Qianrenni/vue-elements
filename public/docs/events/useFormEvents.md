# Events 事件

| 事件名           | 回调参数                          | 说明                   |
|----------------|-------------------------------|----------------------|
| `update:modelValue` | `(value: T)`                  | 表单值变化时触发           |
| `input`          | `(value: T, event: Event)`    | 输入时触发               |
| `change`         | `(value: T)`                  | 值改变且元素失去焦点时触发     |
| `focus`          | `(event: FocusEvent)`         | 表单组件获得焦点时触发        |
| `blur`           | `(event: FocusEvent)`         | 表单组件失去焦点时触发        |
| `clear`          | —                             | 清除表单值时触发            |