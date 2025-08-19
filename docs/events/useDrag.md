# Props 参数

| 参数         | 类型                      | 默认值   | 必填 | 说明                     |
|------------|-------------------------|-------|----|------------------------|
| `elementRef` | `HTMLElement`           | —     | 是  | 目标元素的引用，用于拖拽操作       |
| `onMove`     | `() => void`            | `undefined` | 否  | 拖拽移动时的回调函数           |
| `interval`   | `number`                | `16`   | 否  | 节流间隔（毫秒），最小为 16ms    |
| `threshold`  | `number`                | `10`   | 否  | 移动阈值（像素），达到此距离才视为移动 |

---

# Expose 方法

| 方法名       | 参数 | 返回值 | 说明                     |
|-----------|----|-----|------------------------|
| `destroy` | —  | —   | 清理所有事件监听和资源，释放 pointer capture |

---

# Usage 示例

```ts
const elementRef = ref<HTMLElement>();
const { destroy, isMove } = useDrag(elementRef, () => {
  console.log('Element is being dragged');
}, 32, 15);

// 在组件卸载时调用 destroy
onUnmounted(() => {
  destroy();
});
```