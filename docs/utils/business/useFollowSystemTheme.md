# useFollowSystemTheme

跟随系统主题的 Composable。

## 用法

```typescript
import { useFollowSystemTheme } from 'qyani-components';

const { isDark, toggle } = useFollowSystemTheme();
```

## 返回值

| 属性     | 类型           | 说明           |
| -------- | -------------- | -------------- |
| `isDark` | `Ref<boolean>` | 是否为深色模式 |
| `toggle` | `() => void`   | 切换主题       |
