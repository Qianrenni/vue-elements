# QCard

## 用途

用于组织卡片的头部、主体两侧区域与底部区域；可选启用 `card-animation` 入场动画类。

## 基本用法

```vue
<QCard :animation="true">
  <template #header>标题</template>
  <template #left>左侧内容</template>
  主体内容
  <template #right>右侧内容</template>
  <template #footer>底部内容</template>
</QCard>
```

## Props

| 名称        | 类型      | 必填 | 默认值           | 说明                                           |
| ----------- | --------- | ---- | ---------------- | ---------------------------------------------- |
| `animation` | `boolean` | 否   | 无（源码未设置） | 为 `true` 时为根元素添加 `card-animation` 类。 |

## Emits

无。

## Slots

| 名称      | 作用域参数 | 后备内容 |
| --------- | ---------- | -------- |
| `header`  | 无         | 无。     |
| `default` | 无         | 无。     |
| `left`    | 无         | 无。     |
| `right`   | 无         | 无。     |
| `footer`  | 无         | 无。     |

## Exposes

无。
