import { describe, expect, it } from 'vitest';

import { useRadioGroup } from '../composable';
import type { QRadioGroupProps } from '../type';

describe('useRadioGroup', () => {
  it('应规范化字符串/数字简写选项', () => {
    const props: QRadioGroupProps = { options: ['a', 1] };
    const { normalizedOptions } = useRadioGroup(props);

    expect(normalizedOptions.value).toEqual([
      { value: 'a', label: 'a', disabled: false },
      { value: 1, label: '1', disabled: false },
    ]);
  });

  it('应保留对象选项的 label，缺省时回退为 value', () => {
    const props: QRadioGroupProps = {
      options: [{ label: '苹果', value: 'apple' }, { value: 'pear' }],
    };
    const { normalizedOptions } = useRadioGroup(props);

    expect(normalizedOptions.value[0]).toEqual({
      value: 'apple',
      label: '苹果',
      disabled: false,
    });
    expect(normalizedOptions.value[1].label).toBe('pear');
  });

  it('options 缺省时应为空数组', () => {
    const { normalizedOptions } = useRadioGroup({});

    expect(normalizedOptions.value).toEqual([]);
  });

  it('isChecked 应仅匹配当前值', () => {
    const { isChecked } = useRadioGroup({ value: 'a' });

    expect(isChecked('a')).toBe(true);
    expect(isChecked('b')).toBe(false);
  });

  it('value 为 0 时应正确匹配（不被 falsy 影响）', () => {
    const { isChecked } = useRadioGroup({ value: 0 });

    expect(isChecked(0)).toBe(true);
    expect(isChecked(1)).toBe(false);
  });
});
