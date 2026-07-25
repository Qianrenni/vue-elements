import { describe, expect, it } from 'vitest';

import { useProgressBar } from '../composable';
import type { ProgressBarProps } from '../type';

describe('useProgressBar', () => {
  it('应该为水平方向生成正确的样式', () => {
    const props: ProgressBarProps = {
      percent: '50%',
      direction: 'horizontal',
      color: 'var(--primary-color)',
    };
    const { barStyle } = useProgressBar(props);

    expect(barStyle.value).toEqual({
      width: '50%',
      height: '100%',
      backgroundColor: 'var(--primary-color)',
    });
  });

  it('应该为垂直方向生成正确的样式', () => {
    const props: ProgressBarProps = {
      percent: '50%',
      direction: 'vertical',
      color: 'var(--primary-color)',
    };
    const { barStyle, containerClass } = useProgressBar(props);

    expect(barStyle.value).toEqual({
      width: '100%',
      height: '50%',
      backgroundColor: 'var(--primary-color)',
    });
    expect(containerClass.value['container-column']).toBe(true);
  });

  it('应该使用自定义颜色', () => {
    const props: ProgressBarProps = {
      percent: '30%',
      color: 'red',
    };
    const { barStyle } = useProgressBar(props);

    expect(barStyle.value.backgroundColor).toBe('red');
  });

  it('应该生成正确的水平方向容器类', () => {
    const props: ProgressBarProps = { percent: '80%' };
    const { containerClass } = useProgressBar(props);

    expect(containerClass.value['container-column']).toBe(false);
  });
});
