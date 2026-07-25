import { describe, expect, it } from 'vitest';

import { useThemeToggle } from '../composable';
import type { ThemeToggleProps } from '../type';

describe('useThemeToggle', () => {
  it('应该在未传 size 时使用默认值 20', () => {
    const props: ThemeToggleProps = {};
    const { iconSize } = useThemeToggle(props);

    expect(iconSize.value).toBe(20);
  });

  it('应该透传自定义 size', () => {
    const props: ThemeToggleProps = { size: 24 };
    const { iconSize } = useThemeToggle(props);

    expect(iconSize.value).toBe(24);
  });

  it('应该在未传 dayIcon 时使用默认 Sun', () => {
    const props: ThemeToggleProps = {};
    const { iconName } = useThemeToggle(props);

    expect(iconName.value).toBe('Sun');
  });

  it('应该透传自定义 dayIcon', () => {
    const props: ThemeToggleProps = { dayIcon: 'Light' };
    const { iconName } = useThemeToggle(props);

    expect(iconName.value).toBe('Light');
  });
});
