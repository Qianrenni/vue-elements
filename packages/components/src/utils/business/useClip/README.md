# useClip

字符串截断工具，将超长字符串按指定长度截断，可选追加省略号。

---

## clipString

将字符串截断到指定长度，超出部分可选追加省略号。

```typescript
function clipString(text: string, length: number, isElipse?: boolean): string;
```

### 参数

| 参数     | 类型      | 必填 | 默认值 | 说明                 |
| -------- | --------- | ---- | ------ | -------------------- |
| text     | `string`  | 是   | —      | 待截断的原始字符串   |
| length   | `number`  | 是   | —      | 截断后的最大字符数   |
| isElipse | `boolean` | 否   | `true` | 截断后是否追加 `...` |

### 返回

`string` — 截断后的字符串。若原始长度未超过 `length`，原样返回。

### throws

无
