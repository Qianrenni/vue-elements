import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { QFileUploadProps, UploadFile } from './type';

/** 文件大小单位阶梯 */
const SIZE_UNITS = ['B', 'KB', 'MB', 'GB'] as const;

/** useFileUpload 返回值接口 */
export interface UseFileUploadReturn {
  /** 当前文件列表 */
  files: ComputedRef<UploadFile[]>;
  /** 是否禁用 */
  isDisabled: ComputedRef<boolean>;
  /** 是否还可继续添加文件 */
  canAdd: ComputedRef<boolean>;
  /** 由原生 File 构造上传项 */
  createFile: (file: File) => UploadFile;
  /** 列表形态修饰类 */
  listTypeClass: ComputedRef<string>;
  /** 尺寸修饰类 */
  sizeClass: ComputedRef<string>;
}

/** 生成文件唯一标识：时间戳 + 随机后缀 */
const createUid = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/**
 * 由原生 File 构造上传项
 * @param file 原生文件对象
 * @returns 上传文件项
 */
export const createUploadFile = (file: File): UploadFile => ({
  uid: createUid(),
  name: file.name,
  size: file.size,
  type: file.type,
  status: 'ready',
  raw: file,
});

/**
 * 格式化文件大小
 * @param size 字节数
 * @returns 形如 1.5 KB 的可读文本
 */
export const formatFileSize = (size: number): string => {
  if (!Number.isFinite(size) || size <= 0) return `0 ${SIZE_UNITS[0]}`;

  let value = size;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < SIZE_UNITS.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  // 字节保留整数，其余最多保留两位小数
  const rounded =
    unitIndex === 0 ? Math.round(value) : Math.round(value * 100) / 100;
  return `${rounded} ${SIZE_UNITS[unitIndex]}`;
};

/**
 * FileUpload 组件核心逻辑
 * @param props 组件 Props
 * @returns files 文件列表，isDisabled 是否禁用，canAdd 是否可继续添加，
 *          createFile 构造上传项，listTypeClass/sizeClass 修饰类
 */
export const useFileUpload = (props: QFileUploadProps): UseFileUploadReturn => {
  /** 当前文件列表，默认空数组 */
  const files = computed<UploadFile[]>(() => props.fileList ?? []);

  /** 是否禁用 */
  const isDisabled = computed(() => props.disabled ?? false);

  /** 是否还可继续添加：未禁用且文件数未达 maxCount */
  const canAdd = computed(() => {
    if (isDisabled.value) return false;
    const max = props.maxCount;
    if (max === undefined) return true;
    return files.value.length < max;
  });

  /** 列表形态修饰类 */
  const listTypeClass = computed(
    () => `q-file-upload--${props.listType ?? 'text'}`,
  );

  /** 尺寸修饰类 */
  const sizeClass = computed(() => `q-file-upload--${props.size ?? 'middle'}`);

  return {
    files,
    isDisabled,
    canAdd,
    createFile: createUploadFile,
    listTypeClass,
    sizeClass,
  };
};
