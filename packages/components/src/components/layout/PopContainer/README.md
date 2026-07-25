# QPopContainer

## 用途

在触发内容周围定位并显示弹出内容，可由 `visible` 控制或在悬停时显示。

## 基本用法

```vue
<QPopContainer hover-show position="top-center">
  <QFormButton>悬停查看</QFormButton>
  <template #pop>弹出内容</template>
</QPopContainer>
```

## Props

| 名称        | 类型                                                                                                                                 | 必填 | 默认值           | 说明                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---- | ---------------- | -------------------------------- |
| `visible`   | `boolean`                                                                                                                            | 否   | 无（源码未设置） | 为真时弹出内容可见。             |
| `hoverShow` | `boolean`                                                                                                                            | 否   | 无（源码未设置） | 为真时鼠标悬停容器显示弹出内容。 |
| `position`  | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right' \| 'left-center' \| 'right-center'` | 否   | 无（源码未设置） | 弹出内容相对容器的位置。         |

## Emits

无。

## Slots

| 名称      | 作用域参数 | 后备内容                |
| --------- | ---------- | ----------------------- |
| `default` | 无         | 无；作为触发/锚定内容。 |
| `pop`     | 无         | 无；作为弹出内容。      |

## Exposes

无。
