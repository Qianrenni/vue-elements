import type { FileType, FormFileUploadProps } from './type';

/**
 * FormFileUpload 组件核心逻辑
 * @param props 组件 Props
 * @param emit 组件 Emits
 * @returns onChange 文件选择处理函数
 */
export const useFormFileUpload = (
  props: FormFileUploadProps,
  emit: {
    (e: 'update:modelValue', value: FileType): void;
  },
): {
  onChange: (e: Event) => void;
} => {
  /** 处理文件选择 */
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

  return { onChange };
};
