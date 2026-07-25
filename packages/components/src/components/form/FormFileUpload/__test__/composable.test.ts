import { describe, expect, it, vi } from 'vitest';

import { useFormFileUpload } from '../composable';
import type { FormFileUploadProps } from '../type';

/**
 * 创建模拟的 File 对象
 * @param name 文件名
 * @param content 文件内容
 * @param type MIME 类型
 * @returns File 对象
 */
const createFile = (name: string, content: string, type: string): File =>
  new File([content], name, { type });

/**
 * 创建模拟的 change 事件（单文件）
 * @param file File 对象
 * @returns 模拟的 Event 对象
 */
const createSingleFileEvent = (file: File): Event =>
  ({ target: { files: [file] } }) as unknown as Event;

/**
 * 创建模拟的 change 事件（多文件）
 * @param files File 数组
 * @returns 模拟的 Event 对象
 */
const createMultiFileEvent = (files: File[]): Event =>
  ({ target: { files } }) as unknown as Event;

/**
 * 创建无文件的 change 事件
 * @returns 模拟的 Event 对象
 */
const createEmptyEvent = (): Event =>
  ({ target: { files: null } }) as unknown as Event;

describe('useFormFileUpload', () => {
  it('应该在单文件模式下返回单个 File', () => {
    const props: FormFileUploadProps = { modelValue: null, multiple: false };
    const emit = vi.fn();
    const { onChange } = useFormFileUpload(props, emit);

    const file = createFile('test.txt', 'hello', 'text/plain');
    onChange(createSingleFileEvent(file));

    expect(emit).toHaveBeenCalledWith('update:modelValue', file);
  });

  it('应该在多文件模式下返回 FileList', () => {
    const props: FormFileUploadProps = { modelValue: null, multiple: true };
    const emit = vi.fn();
    const { onChange } = useFormFileUpload(props, emit);

    const file1 = createFile('a.txt', 'aaa', 'text/plain');
    const file2 = createFile('b.txt', 'bbb', 'text/plain');
    onChange(createMultiFileEvent([file1, file2]));

    expect(emit).toHaveBeenCalledWith('update:modelValue', [file1, file2]);
  });

  it('应该在未选择文件时触发 update:modelValue 为 null', () => {
    const props: FormFileUploadProps = { modelValue: null };
    const emit = vi.fn();
    const { onChange } = useFormFileUpload(props, emit);

    onChange(createEmptyEvent());

    expect(emit).toHaveBeenCalledWith('update:modelValue', null);
  });
});
