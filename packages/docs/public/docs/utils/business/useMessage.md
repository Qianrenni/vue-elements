# useMessage

全局消息提示工具，支持 info / success / warning / error 四种类型，基于 Vue 3 渲染 `QMessage` 组件。

---

## useMessage

消息提示对象，提供快捷方法显示和关闭消息。

### show

显示一条消息提示。

```typescript
show(options: string | MessageOptions): { close: () => void }
```

| 参数    | 类型                       | 必填 | 默认值 | 说明                                   |
| ------- | -------------------------- | ---- | ------ | -------------------------------------- |
| options | `string \| MessageOptions` | 是   | —      | 传入字符串作为消息内容，或传入配置对象 |

- **返回**：`{ close: () => void }` — 包含 `close` 方法，可手动关闭该消息。

#### MessageOptions

| 属性     | 类型                                                           | 必填 | 默认值      | 说明                                      |
| -------- | -------------------------------------------------------------- | ---- | ----------- | ----------------------------------------- |
| message  | `string`                                                       | 是   | —           | 消息内容                                  |
| type     | `MessageType`（`'info' \| 'success' \| 'warning' \| 'error'`） | 否   | `'info'`    | 消息类型                                  |
| duration | `number`                                                       | 否   | `1500`      | 显示时间，单位毫秒；设为 `0` 则不自动关闭 |
| onClose  | `() => void`                                                   | 否   | `undefined` | 关闭后的回调函数                          |

### info

显示 info 类型消息。

```typescript
info(msg: string | MessageOptions): { close: () => void }
```

| 参数 | 类型                       | 必填 | 默认值 | 说明             |
| ---- | -------------------------- | ---- | ------ | ---------------- |
| msg  | `string \| MessageOptions` | 是   | —      | 消息内容或配置项 |

### success

显示 success 类型消息。

```typescript
success(msg: string | MessageOptions): { close: () => void }
```

| 参数 | 类型                       | 必填 | 默认值 | 说明             |
| ---- | -------------------------- | ---- | ------ | ---------------- |
| msg  | `string \| MessageOptions` | 是   | —      | 消息内容或配置项 |

### warning

显示 warning 类型消息。

```typescript
warning(msg: string | MessageOptions): { close: () => void }
```

| 参数 | 类型                       | 必填 | 默认值 | 说明             |
| ---- | -------------------------- | ---- | ------ | ---------------- |
| msg  | `string \| MessageOptions` | 是   | —      | 消息内容或配置项 |

### error

显示 error 类型消息。

```typescript
error(msg: string | MessageOptions): { close: () => void }
```

| 参数 | 类型                       | 必填 | 默认值 | 说明             |
| ---- | -------------------------- | ---- | ------ | ---------------- |
| msg  | `string \| MessageOptions` | 是   | —      | 消息内容或配置项 |

### closeAll

关闭所有当前显示的消息。

```typescript
closeAll(): void
```

- **返回**：`void`

### 导出类型

#### MessageOptions

```typescript
interface MessageOptions {
  message: string;
  type?: MessageType;
  duration?: number;
  onClose?: () => void;
}
```

### throws

无
