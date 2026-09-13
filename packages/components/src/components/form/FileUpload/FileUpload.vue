<!--
 * @component QFileUpload
 * @description 文件上传，对齐 Ant Design Upload：隐藏原生 input、支持拖拽、多选、数量限制与上传前校验
 -->
<template>
  <div
    class="q-file-upload"
    :class="[
      listTypeClass,
      sizeClass,
      {
        'q-file-upload--disabled': isDisabled,
        'q-file-upload--drag': drag,
        'q-file-upload--dragover': isDragging,
      },
    ]"
  >
    <input
      ref="inputRef"
      class="q-file-upload__input"
      type="file"
      :accept="accept"
      :disabled="isDisabled"
      :multiple="multiple"
      @change="onSelect"
    />

    <!-- 拖拽区域 -->
    <div
      v-if="drag"
      class="q-file-upload__drop"
      @click="openFileDialog"
      @dragover.prevent="onDragOver"
      @dragleave.prevent="onDragLeave"
      @drop.prevent="onDrop"
    >
      <span aria-hidden="true" class="q-file-upload__icon">＋</span>
      <span class="q-file-upload__drop-text">点击或拖拽文件到此处上传</span>
    </div>

    <!-- 触发按钮 -->
    <button
      v-else
      class="q-file-upload__trigger"
      :disabled="isDisabled"
      type="button"
      @click="openFileDialog"
    >
      <span aria-hidden="true" class="q-file-upload__icon">＋</span>
      <span>选择文件</span>
    </button>

    <!-- 文件列表 -->
    <ul v-if="showUploadList && files.length" class="q-file-upload__list">
      <li
        v-for="file in files"
        :key="file.uid"
        class="q-file-upload__item"
        :class="`q-file-upload__item--${file.status ?? 'ready'}`"
      >
        <img
          v-if="listType === 'picture' && file.url"
          alt=""
          class="q-file-upload__thumb"
          :src="file.url"
        />
        <span
          v-else-if="listType === 'picture'"
          aria-hidden="true"
          class="q-file-upload__thumb q-file-upload__thumb--placeholder"
        >
          {{ file.name.charAt(0).toUpperCase() }}
        </span>

        <button
          class="q-file-upload__name"
          :disabled="isDisabled"
          type="button"
          @click="onPreview(file)"
        >
          {{ file.name }}
        </button>
        <span class="q-file-upload__size">{{ formatFileSize(file.size) }}</span>

        <span v-if="file.status === 'uploading'" class="q-file-upload__status">
          {{ file.percent ?? 0 }}%
        </span>
        <span v-else-if="file.status === 'error'" class="q-file-upload__status">
          上传失败
        </span>

        <button
          class="q-file-upload__remove"
          :disabled="isDisabled"
          type="button"
          @click="onRemove(file)"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue';

import { formatFileSize, useFileUpload } from './composable';
import type { QFileUploadEmits, QFileUploadProps, UploadFile } from './type';

defineOptions({ name: 'QFileUpload' });

const props = withDefaults(defineProps<QFileUploadProps>(), {
  fileList: () => [],
  multiple: false,
  accept: undefined,
  disabled: false,
  maxCount: undefined,
  listType: 'text',
  showUploadList: true,
  drag: false,
  beforeUpload: undefined,
  size: 'middle',
});

const emit = defineEmits<QFileUploadEmits>();

const { files, isDisabled, canAdd, createFile, listTypeClass, sizeClass } =
  useFileUpload(props);

const inputRef = useTemplateRef<HTMLInputElement>('inputRef');

/** 拖拽悬停中 */
const isDragging = ref(false);

/** 打开系统文件选择框 */
function openFileDialog() {
  if (isDisabled.value || !canAdd.value) return;
  inputRef.value?.click();
}

/** 逐个执行 beforeUpload 校验，返回通过的文件 */
async function filterFiles(rawFiles: File[]): Promise<File[]> {
  const beforeUpload = props.beforeUpload;
  if (!beforeUpload) return rawFiles;

  const passed: File[] = [];
  for (const file of rawFiles) {
    try {
      const allowed = await beforeUpload(file, rawFiles);
      if (allowed) passed.push(file);
    } catch {
      // 校验抛错视为不通过，跳过该文件
    }
  }
  return passed;
}

/** 添加文件：校验 → 按 maxCount 截断 → 派发事件 */
async function addFiles(rawFiles: File[]) {
  if (isDisabled.value || rawFiles.length === 0) return;

  // 非多选时只取第一个文件
  const candidates = props.multiple ? rawFiles : rawFiles.slice(0, 1);
  const accepted = await filterFiles(candidates);
  if (accepted.length === 0) return;

  const remained =
    props.maxCount === undefined
      ? accepted.length
      : Math.max(props.maxCount - files.value.length, 0);

  // 超出部分派发 exceed 并截断
  if (accepted.length > remained) {
    emit('exceed', accepted.slice(remained));
  }

  const picked = accepted.slice(0, remained);
  if (picked.length === 0) return;

  const created = picked.map(createFile);
  const nextList = [...files.value, ...created];
  emit('update:fileList', nextList);
  emit('change', { file: created[created.length - 1], fileList: nextList });
}

/** 选择文件 */
function onSelect(ev: Event) {
  const input = ev.target as HTMLInputElement;
  const selected = Array.from(input.files ?? []);
  // 清空 input，保证再次选择同一文件仍能触发 change
  input.value = '';
  void addFiles(selected);
}

/** 移除文件 */
function onRemove(file: UploadFile) {
  const nextList = files.value.filter((item) => item.uid !== file.uid);
  emit('remove', file);
  emit('update:fileList', nextList);
  emit('change', { file, fileList: nextList });
}

/** 预览文件 */
function onPreview(file: UploadFile) {
  emit('preview', file);
}

/** 拖拽悬停 */
function onDragOver() {
  if (isDisabled.value) return;
  isDragging.value = true;
}

/** 拖拽离开 */
function onDragLeave() {
  isDragging.value = false;
}

/** 释放拖拽的文件 */
function onDrop(ev: DragEvent) {
  isDragging.value = false;
  if (isDisabled.value) return;
  void addFiles(Array.from(ev.dataTransfer?.files ?? []));
}
</script>

<style scoped>
.q-file-upload {
  display: inline-flex;
  flex-direction: column;
  gap: var(--q-space-3);
  box-sizing: border-box;
  width: 100%;
  color: var(--q-color-text);
  font-family: var(--q-font-family-base);
  font-size: var(--q-font-size-sm);
  line-height: var(--q-line-height-normal);
}

.q-file-upload__input {
  display: none;
}

.q-file-upload__icon {
  font-size: var(--q-font-size-base);
  line-height: 1;
}

/* — 触发按钮 — */
.q-file-upload__trigger {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  gap: var(--q-space-2);
  box-sizing: border-box;
  height: 2rem;
  padding-inline: var(--q-space-5);
  border: 1px solid var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text);
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  transition:
    color var(--q-duration-fast) var(--q-easing-ease-in-out),
    border-color var(--q-duration-fast) var(--q-easing-ease-in-out),
    background-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-file-upload__trigger:hover:not(:disabled) {
  border-color: var(--q-color-primary);
  color: var(--q-color-primary);
}

.q-file-upload--small .q-file-upload__trigger {
  height: 1.75rem;
  padding-inline: var(--q-space-4);
  font-size: var(--q-font-size-xs);
}

.q-file-upload--large .q-file-upload__trigger {
  height: 2.5rem;
  padding-inline: var(--q-space-6);
  font-size: var(--q-font-size-base);
}

/* — 拖拽区域 — */
.q-file-upload__drop {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--q-space-2);
  box-sizing: border-box;
  padding: var(--q-space-8) var(--q-space-6);
  border: 1px dashed var(--q-color-border-light);
  border-radius: var(--q-radius-md);
  background-color: var(--q-color-bg-card);
  color: var(--q-color-text-muted);
  cursor: pointer;
  transition:
    color var(--q-duration-fast) var(--q-easing-ease-in-out),
    border-color var(--q-duration-fast) var(--q-easing-ease-in-out),
    background-color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-file-upload__drop:hover,
.q-file-upload--dragover .q-file-upload__drop {
  border-color: var(--q-color-primary);
  color: var(--q-color-primary);
}

.q-file-upload--dragover .q-file-upload__drop {
  background-color: var(--q-color-primary-lighter);
}

/* — 禁用态 — */
.q-file-upload--disabled .q-file-upload__trigger,
.q-file-upload--disabled .q-file-upload__drop {
  border-color: var(--q-color-border-light);
  background-color: var(--q-color-bg-secondary);
  color: var(--q-color-text-disabled);
  cursor: not-allowed;
}

/* — 文件列表 — */
.q-file-upload__list {
  display: flex;
  flex-direction: column;
  gap: var(--q-space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.q-file-upload__item {
  display: flex;
  align-items: center;
  gap: var(--q-space-3);
  box-sizing: border-box;
  padding: var(--q-space-2) var(--q-space-3);
  border-radius: var(--q-radius-sm);
  background-color: var(--q-color-gray-50);
  transition: background-color var(--q-duration-fast)
    var(--q-easing-ease-in-out);
}

.q-file-upload__item:hover {
  background-color: var(--q-color-gray-100);
}

.q-file-upload__item--error {
  color: var(--q-color-red-400);
}

.q-file-upload__thumb {
  flex: none;
  width: 2rem;
  height: 2rem;
  border-radius: var(--q-radius-sm);
  object-fit: cover;
}

.q-file-upload__thumb--placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--q-color-primary-light);
  color: var(--q-color-primary);
  font-weight: var(--q-font-weight-medium);
}

.q-file-upload__name {
  flex: 1;
  overflow: hidden;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  text-align: start;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.q-file-upload__name:hover:not(:disabled) {
  color: var(--q-color-primary);
}

.q-file-upload__size,
.q-file-upload__status {
  flex: none;
  color: var(--q-color-text-muted);
  font-size: var(--q-font-size-xs);
}

.q-file-upload__item--error .q-file-upload__status {
  color: var(--q-color-red-400);
}

.q-file-upload__remove {
  flex: none;
  padding: 0 var(--q-space-1);
  border: none;
  background: none;
  color: var(--q-color-text-muted);
  font-family: inherit;
  font-size: var(--q-font-size-base);
  line-height: 1;
  cursor: pointer;
  transition: color var(--q-duration-fast) var(--q-easing-ease-in-out);
}

.q-file-upload__remove:hover:not(:disabled) {
  color: var(--q-color-red-400);
}

.q-file-upload__remove:disabled,
.q-file-upload__name:disabled {
  cursor: not-allowed;
  opacity: var(--q-opacity-60);
}
</style>
