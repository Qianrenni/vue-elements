<!--
 * @component QFormFileUpload
 * @description 文件上传表单组件，支持单选/多选文件
 -->
<template>
  <div
    :class="[
      {
        'container-column': direction === 'vertical',
        'container-align-center': direction !== 'vertical',
        container: direction !== 'vertical',
      },
    ]"
  >
    <p
      v-if="label"
      class="text-label"
      :class="[
        {
          required: required,
        },
      ]"
    >
      {{ label }}
    </p>
    <input
      :id="name"
      :accept="accept"
      :disabled="disabled"
      :multiple="multiple"
      :name="name"
      :required="required"
      type="file"
      class="text-input"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts" setup>
import type { FormFileUploadProps, FileType } from './type';

defineOptions({
  name: 'QFormFileUpload',
});

const props = withDefaults(defineProps<FormFileUploadProps>(), {
  multiple: false,
  accept: '*',
  required: true,
  direction: 'vertical',
  disabled: false,
  autofocus: false,
  readonly: false,
  name: `files${Math.random() * 1000000}`,
  size: 'middle',
  placeholder: '选择文件',
  clearable: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: FileType): void;
}>();

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files;

  if (!files || files.length === 0) {
    emit('update:modelValue', null);
    return;
  }

  // 单文件：返回 File
  if (!props.multiple) {
    emit('update:modelValue', files[0]);
  } else {
    // 多文件：返回 FileList
    emit('update:modelValue', files);
  }
};
</script>

<style scoped></style>
