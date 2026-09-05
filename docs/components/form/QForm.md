# QForm

## 用途

表单容器 + 校验（对齐 antd Form 基础能力）：`model` + `rules` 声明式校验，与子 `QFormItem` 联动（必填星号、label、错误提示、自动按 change/blur 触发校验）。支持 `validate` / `validateField` / `clearValidate` / `resetFields` 及表单提交 `finish` / `finish-failed`。

```vue
<script lang="ts" setup>
import { reactive } from 'vue';

const form = reactive({ name: '', age: 20 });
const rules = {
  name: [{ required: true, message: '请输入姓名' }, { min: 2 }],
  age: [{ type: 'number' }],
};
</script>

<template>
  <QForm :model="form" :rules="rules" @finish="console.log">
    <QFormItem name="name" label="姓名">
      <input v-model="form.name" />
    </QFormItem>
    <QFormButton html-type="submit">提交</QFormButton>
  </QForm>
</template>
```

## Props

| 属性              | 类型                          | 必填 | 默认值         | 说明                                 |
| ----------------- | ----------------------------- | ---- | -------------- | ------------------------------------ |
| `model`           | `Record<string, unknown>`     | 否   | `{}`           | 表单数据对象。                       |
| `rules`           | `Record<string, QFormRule[]>` | 否   | `{}`           | 字段 → 规则数组。                    |
| `labelWidth`      | `number \| string`            | 否   | `'100px'`      | label 宽度（horizontal）。           |
| `layout`          | `'horizontal' \| 'vertical'`  | 否   | `'horizontal'` | 标签在左 / 在上。                    |
| `labelAlign`      | `'left' \| 'right'`           | 否   | `'left'`       | label 对齐。                         |
| `validateTrigger` | `'change' \| 'blur'`          | 否   | `'blur'`       | 默认字段校验触发（可被 item 覆盖）。 |

## Emits

| 事件            | 参数               | 说明           |
| --------------- | ------------------ | -------------- |
| `finish`        | `values`           | 提交校验通过。 |
| `finish-failed` | `(values, errors)` | 提交校验失败。 |

## Exposes

| 方法                   | 说明                         |
| ---------------------- | ---------------------------- |
| `validate()`           | 校验全部字段，返回是否通过。 |
| `validateField(name)`  | 校验单个字段。               |
| `clearValidate(name?)` | 清除错误。                   |
| `resetFields()`        | 还原初始值并清错。           |
| `getFieldValue(name)`  | 读取字段值。                 |
| `errors`               | 错误信息表。                 |

## 校验规则 QFormRule

| 字段          | 类型                                             | 说明                              |
| ------------- | ------------------------------------------------ | --------------------------------- |
| `required`    | `boolean`                                        | 必填。                            |
| `message`     | `string`                                         | 失败提示（缺省有默认文案）。      |
| `pattern`     | `RegExp`                                         | 正则匹配（字符串）。              |
| `min` / `max` | `number`                                         | 数值大小或长度范围。              |
| `len`         | `number`                                         | 精确长度。                        |
| `whitespace`  | `boolean`                                        | 仅空白视为缺失（配合 required）。 |
| `validator`   | `(value, model) => boolean \| string \| Promise` | 自定义校验。                      |

## 说明

- `QFormItem` 通过 provide/inject 注册字段；错误在表单项下方展示，触发后消失自动重校验。
- 校验基于字段最新值（`model[name]`），与具体控件解耦，可直接包裹任意输入。
