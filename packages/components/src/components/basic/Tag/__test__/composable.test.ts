import { describe, expect, it } from 'vitest';

import { useTag } from '../composable';
import type { TagProps } from '../type';

describe('useTag', () => {
  it('应该使用默认颜色和背景色', () => {
    const props: TagProps = {
      text: '标签',
      color: 'white',
      background: 'var(--tag-primary-color)',
    };
    const { styles } = useTag(props);

    expect(styles.value.color).toBe('white');
    expect(styles.value.background).toBe('var(--tag-primary-color)');
  });

  it('应该透传自定义颜色和背景色', () => {
    const props: TagProps = {
      text: '标签',
      color: 'red',
      background: 'blue',
    };
    const { styles } = useTag(props);

    expect(styles.value.color).toBe('red');
    expect(styles.value.background).toBe('blue');
  });

  it('应该只传入 color 时保留默认背景色', () => {
    const props: TagProps = {
      text: '标签',
      color: '#333',
      background: 'var(--tag-primary-color)',
    };
    const { styles } = useTag(props);

    expect(styles.value.color).toBe('#333');
    expect(styles.value.background).toBe('var(--tag-primary-color)');
  });
});
