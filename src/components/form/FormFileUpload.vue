<!-- components/form/FormFileUpload.vue -->
<template>
  <div>
    <label v-if="label" :for="name">{{ label }}:</label>
    <input
        :id="name"
        :accept="accept"
        :multiple="multiple"
        :name="name"
        :required="required"
        type="file"
        @change="onChange"
    />
    <!-- 显示已选文件名（可选） -->
    <div v-if="fileList.length > 0" class="file-list">
      <small>已选择: {{ fileList.map(f => f.name).join(', ') }}</small>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
      modelValue: File | FileList | null;
      name: string;
      label?: string;
      accept?: string; // 如 'image/*,.pdf'
      multiple?: boolean;
      required?: boolean;
    }>(),
    {
      label: '',
      accept: '',
      multiple: false,
      required: true,
    })

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
});

import {computed} from 'vue';
</script>

<style scoped>

</style>
