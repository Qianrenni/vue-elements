import { describe, expect, it } from 'vitest';

import { useQSpace } from '../composable';
import type { QSpaceProps } from '../type';

describe('useQSpace', () => {
  it('默认应为水平排列、middle 间距、center 对齐', () => {
    const props: QSpaceProps = {};
    const { classList, inlineStyle } = useQSpace(props);

    expect(classList.value['q-space--vertical']).toBe(false);
    expect(classList.value['q-space--align-center']).toBe(true);
    expect(inlineStyle.value.columnGap).toBe('var(--q-space-6)');
    expect(inlineStyle.value.rowGap).toBe('var(--q-space-6)');
  });

  it('size 预设应映射对应间距 token', () => {
    expect(useQSpace({ size: 'small' }).inlineStyle.value.columnGap).toBe(
      'var(--q-space-4)',
    );
    expect(useQSpace({ size: 'large' }).inlineStyle.value.columnGap).toBe(
      'var(--q-space-8)',
    );
  });

  it('数值 / 字符串 size 应原样输出', () => {
    expect(useQSpace({ size: 12 }).inlineStyle.value.columnGap).toBe('12px');
    expect(useQSpace({ size: '2rem' }).inlineStyle.value.columnGap).toBe(
      '2rem',
    );
  });

  it('vertical / wrap / align 应生成修饰类', () => {
    const { classList } = useQSpace({
      direction: 'vertical',
      wrap: true,
      align: 'end',
    });

    expect(classList.value['q-space--vertical']).toBe(true);
    expect(classList.value['q-space--wrap']).toBe(true);
    expect(classList.value['q-space--align-end']).toBe(true);
  });

  it('split=true 应使用分隔条并取消 gap', () => {
    const { classList, inlineStyle } = useQSpace({ split: true });

    expect(classList.value['q-space--split']).toBe(true);
    expect(classList.value['q-space--split-bar']).toBe(true);
    expect(inlineStyle.value.columnGap).toBe('0px');
    expect(inlineStyle.value['--q-split-gap']).toBe('var(--q-space-6)');
  });

  it('split=string 应生成分隔文本类与 content 变量', () => {
    const { classList, inlineStyle } = useQSpace({ split: '/' });

    expect(classList.value['q-space--split-text']).toBe(true);
    expect(inlineStyle.value['--q-split-content']).toBe(
      '" /"'.replace(' ', ''),
    );
  });

  it('split=false 应与未开启一致', () => {
    const { classList, inlineStyle } = useQSpace({ split: false });

    expect(classList.value['q-space--split']).toBe(false);
    expect(inlineStyle.value.columnGap).toBe('var(--q-space-6)');
  });
});
