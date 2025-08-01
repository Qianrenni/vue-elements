<!-- components/form/FormFileUpload.vue -->
<template>
  <div
      :class="[
          {
            'container-column':direction === 'vertical',
            'gap-fourth':direction==='vertical',
            'container-align-center':direction!=='vertical'

          }
      ]"
      class="form-file-upload-container"
  >
    <label
        v-if="label"
        :id="name"
        :class="{
          'mouse-cursor-disable':disabled,
          'text-12rem':size==='large',
          'text-05rem':size==='small'
        }"
        :for="name"
        class="label"
    >
      {{ label }}
    </label>
    <div
        class="container-column"
    >
      <input
          :id="name"
          :accept="accept"
          :disabled="disabled"
          :multiple="multiple"
          :name="name"
          :required="required"
          type="file"
          @change="onChange"
      />
      <!-- 显示已选文件名（可选） -->
      <span
          v-if="fileList.length > 1"
          class="file-list"
      >
      <small
          :class="[
              {
                'mouse-cursor-disable':disabled,
                'text-12rem':size==='large',
                'text-05rem':size==='small'
              }
        ]"
      >
        已选择: {{ fileList.map(f => f.name).join(', ') }}
      </small>
    </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {FormComponentProps} from "@/types";
import {computed} from 'vue';

defineOptions({
  name: 'FormFileUpload',
})
type FileType = File | FileList | null;

interface FormFileUploadProps extends FormComponentProps<FileType> {
  multiple?: boolean;
  accept?: string;
}

const props = withDefaults(defineProps<FormFileUploadProps>(), {
  multiple: false,
  accept: '*',
  required: true,
  direction: 'vertical',
  disabled: false,
  autofocus: false,
  readonly: false,
  size: 'middle',
  placeholder: '选择文件',
  clearable: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | FileList | null): void;
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
    // 多文件：返回 FileList（或可转为数组）
    emit('update:modelValue', files);
  }
};

// 用于显示文件名
const fileList = computed(() => {
  const files = props.modelValue;
  if (!files) return [];
  if (files instanceof FileList) return Array.from(files);
  return [files];
});</script>

<style scoped>
</style>
