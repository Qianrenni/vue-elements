import { describe, expect, it } from 'vitest';

import { useMessage } from '../composable';
import type { MessageProps } from '../type';

describe('useMessage', () => {
  it('应该为 success 类型返回 text-success CSS 类', () => {
    const props: MessageProps = { message: '成功', type: 'success' };
    const { typeClass } = useMessage(props);

    expect(typeClass.value).toBe('text-success');
  });

  it('应该为 error 类型返回 text-danger CSS 类', () => {
    const props: MessageProps = { message: '错误', type: 'error' };
    const { typeClass } = useMessage(props);

    expect(typeClass.value).toBe('text-danger');
  });

  it('应该为 warning 类型返回 text-warning CSS 类', () => {
    const props: MessageProps = { message: '警告', type: 'warning' };
    const { typeClass } = useMessage(props);

    expect(typeClass.value).toBe('text-warning');
  });

  it('应该为 info 类型返回 text-gray CSS 类', () => {
    const props: MessageProps = { message: '信息', type: 'info' };
    const { typeClass } = useMessage(props);

    expect(typeClass.value).toBe('text-gray');
  });
});
