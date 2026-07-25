import type { FormComponentEmits } from '@/types';
import { describe, expect, it, vi } from 'vitest';

import { useFormSelect } from '../composable';
import type { FormSelectProps } from '../type';

// mock utils 桶导出，避免 Node 环境加载含浏览器 API 的模块
vi.mock('@/utils', () => ({
  useWindowResize: { addHandler: vi.fn(), removeHandler: vi.fn() },
}));

/**
 * 创建测试用的 Props 与 Emits 模拟对象
 * @param modelValue 初始选中值
 * @returns props 与 emit 模拟函数
 */
const createSelect = (
  modelValue: string | null = null,
): { props: FormSelectProps; emit: ReturnType<typeof vi.fn> } => {
  const props: FormSelectProps = {
    modelValue,
    options: [
      { label: '选项一', value: 'one' },
      { label: '选项二', value: 'two' },
    ],
  };
  return { props, emit: vi.fn() };
};

describe('useFormSelect', () => {
  it('应该在 modelValue 为空时选中标签为空字符串', () => {
    const { props, emit } = createSelect(null);
    const { selectedLabel } = useFormSelect(
      props,
      emit as FormComponentEmits<string>,
    );

    expect(selectedLabel.value).toBe('');
  });

  it('应该根据 modelValue 匹配选中项标签', () => {
    const { props, emit } = createSelect('two');
    const { selectedLabel } = useFormSelect(
      props,
      emit as FormComponentEmits<string>,
    );

    expect(selectedLabel.value).toBe('选项二');
  });

  it('应该在 modelValue 无匹配项时选中标签为空字符串', () => {
    const { props, emit } = createSelect('unknown');
    const { selectedLabel } = useFormSelect(
      props,
      emit as FormComponentEmits<string>,
    );

    expect(selectedLabel.value).toBe('');
  });

  it('应该在选择选项时触发 update:modelValue 事件', () => {
    const { props, emit } = createSelect(null);
    const { selectOption } = useFormSelect(
      props,
      emit as FormComponentEmits<string>,
    );

    selectOption({ label: '选项一', value: 'one' });

    expect(emit).toHaveBeenCalledWith('update:modelValue', 'one');
  });

  it('应该在聚焦时展示下拉并在失焦时隐藏', () => {
    const { props, emit } = createSelect(null);
    const { isShowOptions, handleFocus, handleBlur } = useFormSelect(
      props,
      emit as FormComponentEmits<string>,
    );

    expect(isShowOptions.value).toBe(false);

    handleFocus();
    expect(isShowOptions.value).toBe(true);

    handleBlur();
    expect(isShowOptions.value).toBe(false);
  });

  it('应该阻止输入框文本被编辑并还原为选中标签', () => {
    const { props, emit } = createSelect('one');
    const { preventInput } = useFormSelect(
      props,
      emit as FormComponentEmits<string>,
    );

    const target = { value: '用户输入' } as HTMLInputElement;
    preventInput({ target } as unknown as Event);

    expect(target.value).toBe('选项一');
  });
});
