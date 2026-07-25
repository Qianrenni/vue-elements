# useFollowSystemTheme

跟随系统主题的 Vue 3 组合式函数，自动为 `<body>` 添加/移除 `dark-mode` 类名，支持手动切换。采用单例模式，所有调用方共享同一份主题状态。

---

## useFollowSystemTheme

注册系统主题变化监听，返回当前深色模式状态与手动切换方法。需在 Vue 组件的 `setup` 中调用（内部使用 `onMounted` / `onUnmounted`）。

```typescript
function useFollowSystemTheme(): {
  isDark: Ref<boolean>;
  toggle: () => void;
};
```

### 参数

无

### 返回

`{ isDark, toggle }`

| 属性   | 类型           | 说明                                                                                          |
| ------ | -------------- | --------------------------------------------------------------------------------------------- |
| isDark | `Ref<boolean>` | 当前是否为深色模式（响应式）                                                                  |
| toggle | `() => void`   | 手动切换主题。调用后将退出"跟随系统"模式，并将偏好写入 `localStorage`（键 `preferred-theme`） |

### 行为说明

- **初始化**：若 `localStorage` 中存在 `preferred-theme`，则使用存储值并退出跟随系统模式；否则读取系统偏好。
- **自动监听**：首个组件挂载时绑定 `matchMedia` 变化监听；最后一个组件卸载时解绑。
- **手动切换**：调用 `toggle()` 后不再响应系统主题变化，再次跟随需清除 `localStorage` 并刷新页面。

### throws

无
