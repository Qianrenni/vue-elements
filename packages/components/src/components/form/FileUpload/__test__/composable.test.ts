import { describe, expect, it } from 'vitest';
import { reactive } from 'vue';

import { createUploadFile, formatFileSize, useFileUpload } from '../composable';
import type { QFileUploadProps, UploadFile } from '../type';

/** 构造指定大小的测试文件 */
const makeFile = (name: string, size: number, type = 'text/plain'): File =>
  new File([new Uint8Array(size)], name, { type });

/** 构造测试用上传项 */
const makeUploadFile = (uid: string): UploadFile => ({
  uid,
  name: `${uid}.txt`,
  size: 1,
  type: 'text/plain',
});

describe('formatFileSize', () => {
  it('应格式化字节', () => {
    expect(formatFileSize(512)).toBe('512 B');
  });

  it('应格式化 KB 并最多保留两位小数', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
    expect(formatFileSize(1234)).toBe('1.21 KB');
  });

  it('应格式化 MB 与 GB', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(1024 ** 3)).toBe('1 GB');
  });

  it('0 与非法值应回退为 0 B', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(-1)).toBe('0 B');
    expect(formatFileSize(Number.NaN)).toBe('0 B');
  });
});

describe('createUploadFile', () => {
  it('应复制文件信息并标记为 ready', () => {
    const raw = makeFile('logo.png', 1536, 'image/png');
    const item = createUploadFile(raw);

    expect(item.name).toBe('logo.png');
    expect(item.size).toBe(1536);
    expect(item.type).toBe('image/png');
    expect(item.status).toBe('ready');
    expect(item.raw).toBe(raw);
  });

  it('uid 应非空且不重复', () => {
    const first = createUploadFile(makeFile('a.txt', 1));
    const second = createUploadFile(makeFile('b.txt', 1));

    expect(first.uid).not.toBe('');
    expect(first.uid).not.toBe(second.uid);
  });
});

describe('useFileUpload', () => {
  it('fileList 缺省时应为空数组', () => {
    const { files } = useFileUpload({});

    expect(files.value).toEqual([]);
  });

  it('应反映传入的 fileList', () => {
    const list = [makeUploadFile('a')];
    const { files } = useFileUpload({ fileList: list });

    expect(files.value).toBe(list);
  });

  it('默认应可交互且可继续添加', () => {
    const { isDisabled, canAdd } = useFileUpload({});

    expect(isDisabled.value).toBe(false);
    expect(canAdd.value).toBe(true);
  });

  it('disabled 时应不可交互且不可添加', () => {
    const { isDisabled, canAdd } = useFileUpload({ disabled: true });

    expect(isDisabled.value).toBe(true);
    expect(canAdd.value).toBe(false);
  });

  it('达到 maxCount 时不可再添加', () => {
    const { canAdd } = useFileUpload({
      fileList: [makeUploadFile('a'), makeUploadFile('b')],
      maxCount: 2,
    });

    expect(canAdd.value).toBe(false);
  });

  it('删除文件后应恢复可添加（响应式）', () => {
    const props = reactive<QFileUploadProps>({
      fileList: [makeUploadFile('a'), makeUploadFile('b')],
      maxCount: 2,
    });
    const { canAdd } = useFileUpload(props);

    expect(canAdd.value).toBe(false);

    props.fileList = [makeUploadFile('a')];
    expect(canAdd.value).toBe(true);
  });

  it('默认修饰类应为 text + middle', () => {
    const { listTypeClass, sizeClass } = useFileUpload({});

    expect(listTypeClass.value).toBe('q-file-upload--text');
    expect(sizeClass.value).toBe('q-file-upload--middle');
  });

  it('listType/size 应生成对应修饰类', () => {
    const { listTypeClass, sizeClass } = useFileUpload({
      listType: 'picture',
      size: 'large',
    });

    expect(listTypeClass.value).toBe('q-file-upload--picture');
    expect(sizeClass.value).toBe('q-file-upload--large');
  });

  it('createFile 应返回带 raw 的上传项', () => {
    const raw = makeFile('a.txt', 8);
    const { createFile } = useFileUpload({});

    expect(createFile(raw).raw).toBe(raw);
  });
});
