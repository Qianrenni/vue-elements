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
import { useFormFileUpload } from './composable';
import type { FileType, FormFileUploadProps } from './type';

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

const { onChange } = useFormFileUpload(props, emit);
</script>

<style scoped></style>
