import { describe, expect, it } from 'vitest';

import { useSelect } from '../composable';

describe('useSelect', () => {
  it('应规范化字符串/数字简写选项', () => {
    const { normalizedOptions } = useSelect({ options: ['a', 1] });

    expect(normalizedOptions.value).toEqual([
      { value: 'a', label: 'a', disabled: false },
      { value: 1, label: '1', disabled: false },
    ]);
  });

  it('单选模式下应将 value 归一为数组', () => {
    const { selectedValues, isMultiple } = useSelect({ value: 'a' });

    expect(isMultiple.value).toBe(false);
    expect(selectedValues.value).toEqual(['a']);
  });

  it('多选模式下应保留数组值', () => {
    const { selectedValues, isMultiple } = useSelect({
      mode: 'multiple',
      value: ['a', 'b'],
    });

    expect(isMultiple.value).toBe(true);
    expect(selectedValues.value).toEqual(['a', 'b']);
  });

  it('value 缺省时选中值为空数组', () => {
    const { selectedValues } = useSelect({});

    expect(selectedValues.value).toEqual([]);
  });

  it('单选 nextValue 应返回被点击的值', () => {
    const { nextValue } = useSelect({
      options: ['a', 'b'],
      value: 'a',
    });
    const option = { value: 'b', label: 'b', disabled: false };

    expect(nextValue(option)).toBe('b');
  });

  it('多选 nextValue 应追加未选中值', () => {
    const { nextValue } = useSelect({ mode: 'multiple', value: ['a'] });

    expect(nextValue({ value: 'b', label: 'b', disabled: false })).toEqual([
      'a',
      'b',
    ]);
  });

  it('多选 nextValue 应移除已选中值', () => {
    const { nextValue } = useSelect({ mode: 'multiple', value: ['a', 'b'] });

    expect(nextValue({ value: 'a', label: 'a', disabled: false })).toEqual([
      'b',
    ]);
  });

  it('removeValue 应移除指定值', () => {
    const { removeValue } = useSelect({ mode: 'multiple', value: ['a', 'b'] });

    expect(removeValue('a')).toEqual(['b']);
  });

  it('allowClear 且有选中值时应展示清除按钮', () => {
    const { showClear } = useSelect({ allowClear: true, value: 'a' });

    expect(showClear.value).toBe(true);
  });

  it('displayText 应展示选中项文案', () => {
    const { displayText } = useSelect({
      options: [{ label: '苹果', value: 'apple' }],
      value: 'apple',
    });

    expect(displayText.value).toBe('苹果');
  });

  it('多选模式下 displayText 为空字符串', () => {
    const { displayText } = useSelect({ mode: 'multiple', value: ['a'] });

    expect(displayText.value).toBe('');
  });

  it('showSearch 时应按关键字过滤选项', () => {
    const { filteredOptions, searchText } = useSelect({
      options: [
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana' },
      ],
      showSearch: true,
    });
    searchText.value = '苹';

    expect(filteredOptions.value).toEqual([
      { value: 'apple', label: '苹果', disabled: false },
    ]);
  });

  it('自定义 filterOption 应生效', () => {
    const { filteredOptions, searchText } = useSelect({
      options: [{ label: '苹果', value: 'apple' }],
      showSearch: true,
      filterOption: (input, option) => option.value === input,
    });
    searchText.value = 'apple';

    expect(filteredOptions.value).toHaveLength(1);

    searchText.value = '苹';

    expect(filteredOptions.value).toHaveLength(0);
  });

  it('未开启 showSearch 时不过滤选项', () => {
    const { filteredOptions, searchText } = useSelect({
      options: ['a', 'b'],
    });
    searchText.value = 'a';

    expect(filteredOptions.value).toHaveLength(2);
  });

  it('status 与 size 应生成修饰类', () => {
    const { statusClass, sizeClass } = useSelect({
      status: 'error',
      size: 'large',
    });

    expect(statusClass.value).toBe('q-select--error');
    expect(sizeClass.value).toBe('q-select--large');
  });
});
