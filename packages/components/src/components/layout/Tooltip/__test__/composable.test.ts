import { describe, expect, it } from 'vitest';

import { useQTooltip } from '../composable';
import type { QTooltipProps } from '../type';

describe('useQTooltip', () => {
  it('默认 placement 应为 top / center', () => {
    const props: QTooltipProps = {};
    const { side, align } = useQTooltip(props);

    expect(side.value).toBe('top');
    expect(align.value).toBe('center');
  });

  it('placement 应解析出边与对齐', () => {
    expect(useQTooltip({ placement: 'bottomLeft' }).side.value).toBe('bottom');
    expect(useQTooltip({ placement: 'bottomLeft' }).align.value).toBe('start');
    expect(useQTooltip({ placement: 'topRight' }).side.value).toBe('top');
    expect(useQTooltip({ placement: 'topRight' }).align.value).toBe('end');
    expect(useQTooltip({ placement: 'left' }).side.value).toBe('left');
    expect(useQTooltip({ placement: 'right' }).side.value).toBe('right');
  });

  it('hasContent 应依据 content 判断', () => {
    expect(useQTooltip({ content: '' }).hasContent.value).toBe(false);
    expect(useQTooltip({ content: '提示' }).hasContent.value).toBe(true);
  });

  it('open 传入时应为受控模式', () => {
    expect(useQTooltip({}).isControlled.value).toBe(false);
    expect(useQTooltip({ open: false }).isControlled.value).toBe(true);
  });
});
