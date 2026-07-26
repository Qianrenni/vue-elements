# useFormEvents

表单组件通用事件处理器工厂函数，将 Vue 组件的 `emit` 封装为标准化的表单事件处理方法。

---

## useFormEvents

为表单组件创建一组预绑定 `emit` 的事件处理函数。

```typescript
function useFormEvents<T>(emit: FormComponentEmits<T>): {
  handleInput: (value: T) => void;
  handleChange: (value: T) => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleClear: (clearValue: T) => void;
};
```

### 参数

| 参数 | 类型                    | 必填 | 默认值 | 说明                                       |
| ---- | ----------------------- | ---- | ------ | ------------------------------------------ |
| emit | `FormComponentEmits<T>` | 是   | —      | `defineEmits` 的返回函数，用于触发组件事件 |

### 返回

`{ handleInput, handleChange, handleFocus, handleBlur, handleClear }`

| 方法         | 签名                      | 说明                                                                     |
| ------------ | ------------------------- | ------------------------------------------------------------------------ |
| handleInput  | `(value: T) => void`      | 处理 input 事件，触发 `update:modelValue` 和 `input`                     |
| handleChange | `(value: T) => void`      | 处理 change 事件，触发 `update:modelValue` 和 `change`                   |
| handleFocus  | `() => void`              | 处理 focus 事件，触发 `focus`                                            |
| handleBlur   | `() => void`              | 处理 blur 事件，触发 `blur`                                              |
| handleClear  | `(clearValue: T) => void` | 处理 clear 事件，触发 `update:modelValue`（传入 `clearValue`）和 `clear` |

### throws

无
