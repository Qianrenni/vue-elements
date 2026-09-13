# QFileUpload

## 用途

文件上传，对齐 Ant Design `Upload`（简化版）：`v-model:file-list` 双向绑定，隐藏原生 `<input type="file">` 并渲染触发按钮 / 拖拽区域，支持多选、数量限制与上传前校验。组件只负责「选择文件 + 维护列表」，不发起真实上传请求，状态（`status` / `percent`）由使用方自行维护。

## 基本用法

```vue
<script lang="ts" setup>
import type { UploadFile } from 'qyani-components';
import { ref } from 'vue';

const fileList = ref<UploadFile[]>([]);

/** 限制 2MB 以内 */
const beforeUpload = (file: File) => file.size <= 2 * 1024 * 1024;
</script>

<template>
  <!-- 按钮触发 + 多选 -->
  <QFileUpload
    v-model:file-list="fileList"
    multiple
    :max-count="3"
    accept="image/*"
    :before-upload="beforeUpload"
    @remove="(file) => console.log('移除', file.uid)"
  />

  <!-- 拖拽区域 + 缩略图列表 -->
  <QFileUpload v-model:file-list="fileList" drag list-type="picture" />
</template>
```

## Props

| 属性             | 类型                                              | 必填 | 默认值     | 说明                                              |
| ---------------- | ------------------------------------------------- | ---- | ---------- | ------------------------------------------------- |
| `fileList`       | `UploadFile[]`                                    | 否   | `[]`       | 文件列表（`v-model:file-list`）。                 |
| `multiple`       | `boolean`                                         | 否   | `false`    | 是否支持多选文件。                                |
| `accept`         | `string`                                          | 否   | 无         | 接受的文件类型，如 `image/*` 或 `.png,.jpg`。     |
| `disabled`       | `boolean`                                         | 否   | `false`    | 是否禁用。                                        |
| `maxCount`       | `number`                                          | 否   | 无         | 最大文件数，超出部分派发 `exceed` 并截断。        |
| `listType`       | `'text' \| 'picture'`                             | 否   | `'text'`   | 列表形态：文本 / 带缩略图。                       |
| `showUploadList` | `boolean`                                         | 否   | `true`     | 是否展示已选文件列表。                            |
| `drag`           | `boolean`                                         | 否   | `false`    | 是否使用拖拽区域外观与 `dragover` / `drop` 处理。 |
| `beforeUpload`   | `(file, fileList) => boolean \| Promise<boolean>` | 否   | 无         | 上传前校验，返回 `false` 或 reject 时跳过该文件。 |
| `size`           | `'small' \| 'middle' \| 'large'`                  | 否   | `'middle'` | 触发按钮/拖拽区尺寸。                             |

### UploadFile

| 属性      | 类型                                          | 必填 | 默认值    | 说明                                     |
| --------- | --------------------------------------------- | ---- | --------- | ---------------------------------------- |
| `uid`     | `string`                                      | 是   | 无        | 文件唯一标识。                           |
| `name`    | `string`                                      | 是   | 无        | 文件名。                                 |
| `size`    | `number`                                      | 是   | 无        | 文件大小（字节）。                       |
| `type`    | `string`                                      | 是   | 无        | 文件 MIME 类型。                         |
| `status`  | `'ready' \| 'uploading' \| 'done' \| 'error'` | 否   | `'ready'` | 文件状态。                               |
| `percent` | `number`                                      | 否   | 无        | 上传进度百分比。                         |
| `url`     | `string`                                      | 否   | 无        | 预览地址（`picture` 形态下作为缩略图）。 |
| `raw`     | `File`                                        | 否   | 无        | 原始 `File` 对象。                       |

## Emits

| 事件              | 参数                                           | 说明                                  |
| ----------------- | ---------------------------------------------- | ------------------------------------- |
| `update:fileList` | `UploadFile[]`                                 | 文件列表变化（`v-model:file-list`）。 |
| `change`          | `{ file: UploadFile; fileList: UploadFile[] }` | 文件列表变化，含新增与删除。          |
| `remove`          | `UploadFile`                                   | 移除某个文件。                        |
| `exceed`          | `File[]`                                       | 超出 `maxCount`，参数为被截断的文件。 |
| `preview`         | `UploadFile`                                   | 点击文件名预览。                      |

## Slots

无。

## Exposes

无。

## 与 Ant Design 的差异

- 不上传文件：antd 的 `action` / `customRequest` / 请求头等由组件发起上传，本组件只做选择与列表管理，`status` / `percent` 交由使用方维护。
- 不做 `beforeUpload` 的自动拦截上传（antd 返回 `false` 仅停止上传），此处返回 `false` 或 reject 即**跳过该文件**（不进入列表）。
- 无 `progress` / `itemRender` / 拖拽目录 / 图片裁剪等高级能力；`listType` 仅支持 `text` 与 `picture`，`picture-card` 未实现。
- 不内置 `label`，交由 `QFormItem` 提供。
