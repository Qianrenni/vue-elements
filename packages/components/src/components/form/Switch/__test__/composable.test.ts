import { describe, expect, it } from 'vitest';

import { useSwitch } from '../composable';

describe('useSwitch', () => {
  it('value 缺省时应为关闭状态', () => {
    const { checked } = useSwitch({});

    expect(checked.value).toBe(false);
  });

  it('应反映传入的 value', () => {
    const { checked } = useSwitch({ value: true });

    expect(checked.value).toBe(true);
  });

  it('默认应可交互', () => {
    const { isDisabled } = useSwitch({});

    expect(isDisabled.value).toBe(false);
  });

  it('disabled 时应不可交互', () => {
    const { isDisabled } = useSwitch({ disabled: true });

    expect(isDisabled.value).toBe(true);
  });

  it('loading 时应不可交互', () => {
    const { isDisabled } = useSwitch({ loading: true });

    expect(isDisabled.value).toBe(true);
  });
});
