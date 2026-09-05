# QResult

## 用途

结果页：用于展示操作结果（成功 / 失败 / 异常 / 无权限等状态），常用于表单提交、支付、鉴权等流程后的反馈页，对齐 Ant Design Result 常用能力。

## 基本用法

```vue
<template>
  <QResult status="success" title="操作成功" sub-title="提交的表单已处理完成">
    <template #extra>
      <QButton type="primary">返回首页</QButton>
    </template>
  </QResult>
</template>
```

## Props

| 属性       | 类型                                                                     | 必填 | 默认值   | 说明            |
| ---------- | ------------------------------------------------------------------------ | ---- | -------- | --------------- |
| `status`   | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500'` | 否   | `'info'` | 结果状态。      |
| `title`    | `string`                                                                 | 否   | —        | 结果标题。      |
| `subTitle` | `string`                                                                 | 否   | —        | 副标题 / 说明。 |

## Slots

| 插槽        | 说明                           |
| ----------- | ------------------------------ |
| `#icon`     | 覆盖状态图标。                 |
| `#title`    | 覆盖标题。                     |
| `#subTitle` | 覆盖副标题。                   |
| `#default`  | 自定义内容区（标题下方）。     |
| `#extra`    | 操作区（按钮等，位于最下方）。 |

- 语义态（success/error/info/warning）显示对应圆形图标；HTTP 态（404/403/500）显示大号状态码图形。

## Emits

无。

## Exposes

无。
