import { describe, expect, it } from 'vitest';

import { useCheckboxGroup } from '../composable';
import type { QCheckboxGroupProps } from '../type';

describe('useCheckboxGroup', () => {
  it('应规范化字符串/数字简写选项', () => {
    const props: QCheckboxGroupProps = { options: ['a', 1] };
    const { normalizedOptions } = useCheckboxGroup(props);

    expect(normalizedOptions.value).toEqual([
      { value: 'a', label: 'a', disabled: false },
      { value: 1, label: '1', disabled: false },
    ]);
  });

  it('应保留对象选项的 label，缺省时回退为 value', () => {
    const props: QCheckboxGroupProps = {
      options: [{ label: '苹果', value: 'apple' }, { value: 'pear' }],
    };
    const { normalizedOptions } = useCheckboxGroup(props);

    expect(normalizedOptions.value[0]).toEqual({
      value: 'apple',
      label: '苹果',
      disabled: false,
    });
    expect(normalizedOptions.value[1].label).toBe('pear');
  });

  it('options 缺省时应为空数组', () => {
    const { normalizedOptions } = useCheckboxGroup({});

    expect(normalizedOptions.value).toEqual([]);
  });

  it('isChecked 应正确判断选中态', () => {
    const { isChecked } = useCheckboxGroup({ value: ['a'] });

    expect(isChecked('a')).toBe(true);
    expect(isChecked('b')).toBe(false);
  });

  it('toggle 应追加未选中值', () => {
    const { toggle } = useCheckboxGroup({ value: ['a'] });

    expect(toggle('b')).toEqual(['a', 'b']);
  });

  it('toggle 应移除已选中值', () => {
    const { toggle } = useCheckboxGroup({ value: ['a', 'b'] });

    expect(toggle('a')).toEqual(['b']);
  });

  it('value 缺省时 toggle 应返回单项数组', () => {
    const { toggle } = useCheckboxGroup({});

    expect(toggle('a')).toEqual(['a']);
  });
});
