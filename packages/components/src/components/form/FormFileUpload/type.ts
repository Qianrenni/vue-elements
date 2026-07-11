import type { FormComponentProps } from '@/types';

/** 文件类型 */
export type FileType = File | FileList | null;

/**
 * FormFileUpload 组件 Props
 */
export interface FormFileUploadProps extends FormComponentProps<FileType> {
  /**
   * 是否支持多文件上传
   */
  multiple?: boolean;
  /**
   * 接受的文件类型（MIME 或扩展名）
   */
  accept?: string;
}
