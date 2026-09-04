import { describe, expect, it } from 'vitest';

import { useSteps } from '../composable';
import type { StepsProps } from '../type';

describe('useSteps', () => {
  it('current=1 时前步 finish、当前 process、其后 wait', () => {
    const props: StepsProps = {
      current: 1,
      items: [{ title: 'a' }, { title: 'b' }, { title: 'c' }],
    };
    const { steps } = useSteps(props);

    expect(steps.value.map((s) => s.status)).toEqual([
      'finish',
      'process',
      'wait',
    ]);
    expect(steps.value[0].last).toBe(false);
    expect(steps.value[2].last).toBe(true);
  });

  it('status=error 应作用到当前步', () => {
    const { steps } = useSteps({
      current: 0,
      status: 'error',
      items: [{ title: 'a' }, { title: 'b' }],
    });
    expect(steps.value[0].status).toBe('error');
    expect(steps.value[1].status).toBe('wait');
  });

  it('direction / size / clickable 应生成修饰类', () => {
    const { classList } = useSteps({
      direction: 'vertical',
      size: 'small',
      clickable: true,
      items: [{ title: 'a' }],
    });

    expect(classList.value['q-steps--vertical']).toBe(true);
    expect(classList.value['q-steps--small']).toBe(true);
    expect(classList.value['q-steps--clickable']).toBe(true);
  });
});
