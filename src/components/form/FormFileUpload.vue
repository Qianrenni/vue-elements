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
          'text-08rem':size==='small'
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
      <!-- 显示已选文件名 -->
      <div
          v-if="fileList.length > 0"
          class="file-list container-column gap-fourth margin-third-vetical"
      >
        <!-- 单文件显示 -->
        <div
            v-if="fileList.length === 1"
            class="container-align-center gap-fourth"
        >
          <span
              :class="[
                {
                  'mouse-cursor-disable': disabled,
                  'text-12rem': size === 'large',
                  'text-08rem': size === 'small'
                }
              ]"
              class="file-item container-align-center padding-24rem bg-gray-100 radius-third-rem"
          >
            {{ fileList[0].name }}
            <span
                v-if="!disabled && clearable"
                class="file-remove mouse-cursor hover-red margin-half-horizontal"
                @click.stop="removeFile(0)"
            >
              ×
            </span>
          </span>
        </div>

        <!-- 多文件显示 -->
        <div
            v-else
            class="container container-wrap gap-fourth"
        >
          <span
              v-for="(file, index) in fileList"
              :key="index"
              :class="[
                {
                  'mouse-cursor-disable': disabled,
                  'text-12rem': size === 'large',
                  'text-08rem': size === 'small'
                }
              ]"
              class="file-item container-align-center padding-24rem bg-gray-100 radius-third-rem"
          >
            {{ file.name }}
            <span
                v-if="!disabled && clearable"
                class="file-remove mouse-cursor hover-red margin-half-horizontal"
                @click.stop="removeFile(index)"
            >
              ×
            </span>
          </span>
        </div>
      </div>
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
  name: `files${Math.random() * 1000000}`,
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

// 删除单个文件
const removeFile = (index: number) => {
  if (!props.multiple) {
    // 单文件模式：直接清空
    emit('update:modelValue', null);
    // 重置input元素的value，以便可以再次选择同一文件
    const inputElement = document.getElementById(props.name) as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
    return;
  }

  // 多文件模式：从文件列表中移除指定文件
  const currentFiles = Array.from(props.modelValue as FileList);
  currentFiles.splice(index, 1);

  if (currentFiles.length === 0) {
    // 如果删除后没有文件，则设置为null
    emit('update:modelValue', null);
  } else {
    // 创建新的DataTransfer对象来构建新的FileList
    const dataTransfer = new DataTransfer();
    currentFiles.forEach(file => dataTransfer.items.add(file));
    emit('update:modelValue', dataTransfer.files);
  }

  // 重置input元素的value，以便可以再次选择同一文件
  const inputElement = document.getElementById(props.name) as HTMLInputElement;
  if (inputElement) {
    inputElement.value = '';
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
