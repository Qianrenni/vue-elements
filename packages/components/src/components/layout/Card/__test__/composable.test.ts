import { describe, expect, it } from 'vitest';

import { useCard } from '../composable';
import type { CardProps } from '../type';

describe('useCard', () => {
  it('应该在 animation 为 true 时添加 card-animation 类', () => {
    const props: CardProps = { animation: true };
    const { cardClass } = useCard(props);

    expect(cardClass.value['card-animation']).toBe(true);
  });

  it('应该在 animation 为 false 时移除 card-animation 类', () => {
    const props: CardProps = { animation: false };
    const { cardClass } = useCard(props);

    expect(cardClass.value['card-animation']).toBe(false);
  });

  it('应该在 animation 未传入时默认为 false', () => {
    const props: CardProps = {};
    const { cardClass } = useCard(props);

    expect(cardClass.value['card-animation']).toBe(false);
  });
});
