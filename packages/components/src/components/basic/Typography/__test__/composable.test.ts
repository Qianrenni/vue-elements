import { describe, expect, it } from 'vitest';

import { useQTypography } from '../composable';
import type { QTypographyProps } from '../type';

describe('useQTypography', () => {
  it('默认根标签应为 span', () => {
    const props: QTypographyProps = {};
    const { tag } = useQTypography(props);

    expect(tag.value).toBe('span');
  });

  it('level 应映射到 h1~h5', () => {
    expect(useQTypography({ level: 1 }).tag.value).toBe('h1');
    expect(useQTypography({ level: 3 }).tag.value).toBe('h3');
  });

  it('paragraph 应映射到 p', () => {
    expect(useQTypography({ paragraph: true }).tag.value).toBe('p');
  });

  it('tag 自定义应优先于 level / paragraph', () => {
    expect(useQTypography({ tag: 'strong', level: 2 }).tag.value).toBe(
      'strong',
    );
    expect(useQTypography({ tag: 'div', paragraph: true }).tag.value).toBe(
      'div',
    );
  });

  it('应生成类型与文本样式修饰类', () => {
    const { classList } = useQTypography({
      type: 'danger',
      strong: true,
      code: true,
      disabled: true,
    });

    expect(classList.value['q-typ--type-danger']).toBe(true);
    expect(classList.value['q-typ--strong']).toBe(true);
    expect(classList.value['q-typ--code']).toBe(true);
    expect(classList.value['q-typ--disabled']).toBe(true);
  });

  it('数字 ellipsis 应输出多行省略行数变量', () => {
    const single = useQTypography({ ellipsis: true });
    expect(single.classList.value['q-typ--ellipsis']).toBe(true);
    expect(single.styleVars.value['--q-typ-lines']).toBeUndefined();

    const multi = useQTypography({ ellipsis: 2 });
    expect(multi.classList.value['q-typ--ellipsis']).toBe(true);
    expect(multi.styleVars.value['--q-typ-lines']).toBe('2');
  });

  it('copyable 应展示复制按钮', () => {
    expect(useQTypography({ copyable: true }).showCopy.value).toBe(true);
    expect(useQTypography({}).showCopy.value).toBe(false);
  });
});
