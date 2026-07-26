# useTimeDisplay

Vue 3 时间显示组合式函数，支持实时时间、倒计时和格式化显示三种模式。

---

## useTimeDisplay

根据参数自动判断模式：实时时间（无 `source`）、格式化显示（有 `source` + `realtime` 模式）、倒计时（有 `source` + `countdown` 模式）。

```typescript
function useTimeDisplay(
  source?: Date | string | number,
  format?: string,
  options?: UseTimeDisplayOptions,
): {
  value: Ref<string>;
  start: () => void;
  stop: () => void;
};
```

### 参数

| 参数    | 类型                       | 必填 | 默认值                  | 说明                                                                                     |
| ------- | -------------------------- | ---- | ----------------------- | ---------------------------------------------------------------------------------------- |
| source  | `Date \| string \| number` | 否   | `undefined`             | 时间源；不传表示当前实时时间                                                             |
| format  | `string`                   | 否   | `'YYYY-MM-DD HH:mm:ss'` | 格式化字符串。若包含 `D`/`H`/`m`/`s` 等倒计时占位符并配合 `countdown` 模式，则显示倒计时 |
| options | `UseTimeDisplayOptions`    | 否   | `{}`                    | 配置项，详见下方                                                                         |

#### UseTimeDisplayOptions

| 属性      | 类型                        | 必填 | 默认值       | 说明                                                         |
| --------- | --------------------------- | ---- | ------------ | ------------------------------------------------------------ |
| autoStart | `boolean`                   | 否   | —            | 是否自动启动（当前版本默认不自动启动，需手动调用 `start()`） |
| interval  | `number`                    | 否   | `1000`       | 更新间隔，单位毫秒                                           |
| onFinish  | `() => void`                | 否   | `undefined`  | 倒计时结束时的回调                                           |
| mode      | `'countdown' \| 'realtime'` | 否   | `'realtime'` | 模式控制                                                     |

### 返回

`{ value, start, stop }`

| 属性  | 类型          | 说明             |
| ----- | ------------- | ---------------- |
| value | `Ref<string>` | 响应式时间字符串 |
| start | `() => void`  | 启动定时更新     |
| stop  | `() => void`  | 停止定时更新     |

### 导出类型

#### UseTimeDisplayOptions

```typescript
interface UseTimeDisplayOptions {
  autoStart?: boolean;
  interval?: number;
  onFinish?: () => void;
  mode?: 'countdown' | 'realtime';
}
```

### throws

无
