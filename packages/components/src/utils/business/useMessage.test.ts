import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useMessage } from './useMessage';

vi.mock('@/components/basic/Message', () => ({
  QMessage: { name: 'QMessage', render: () => {} },
  MessageType: {} as const,
}));

vi.mock('vue', async (importOriginal) => {
  const actual = await importOriginal<typeof import('vue')>();
  return {
    ...actual,
    render: vi.fn((vnode: unknown, _container: unknown) => {
      if (vnode === null) return;
      (vnode as Record<string, unknown>).el = {
        classList: { remove: vi.fn(), add: vi.fn() },
        parentElement: _container,
      };
    }),
  };
});

describe('useMessage', () => {
  let containerEl: {
    style: Record<string, string>;
    parentNode: unknown;
    remove: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    containerEl = {
      style: {},
      parentNode: null,
      remove: vi.fn(),
    };

    vi.stubGlobal('document', {
      createElement: vi.fn(() => containerEl),
      createComment: vi.fn(),
      body: {
        appendChild: vi.fn((child: unknown) => {
          (child as typeof containerEl).parentNode = document.body;
        }),
        removeChild: vi.fn(),
      },
    });
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('应该通过字符串消息显示通知', () => {
    const result = useMessage.show('hello');
    expect(document.createElement).toHaveBeenCalledWith('div');
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(result).toHaveProperty('close');
  });

  it('应该通过 MessageOptions 显示通知', () => {
    const result = useMessage.show({
      message: 'test',
      type: 'success',
      duration: 2000,
    });
    expect(document.body.appendChild).toHaveBeenCalled();
    expect(result).toHaveProperty('close');
  });

  it('应该在 duration 后自动关闭', () => {
    useMessage.show({ message: 'auto', duration: 1000 });

    // closeMessage 触发需要 duration 时间
    vi.advanceTimersByTime(1000);
    // closeMessage 内部还有 300ms 动画定时器
    vi.advanceTimersByTime(300);

    expect(containerEl.remove).toHaveBeenCalled();
  });

  it('应该支持手动关闭', () => {
    const { close } = useMessage.show({ message: 'manual', duration: 0 });
    close();

    // closeMessage 内部有 300ms 动画定时器
    vi.advanceTimersByTime(300);

    expect(containerEl.remove).toHaveBeenCalled();
  });

  it('应该提供 info/success/warning/error 便捷方法', () => {
    const info = useMessage.info('info msg');
    expect(info).toHaveProperty('close');

    const success = useMessage.success('success msg');
    expect(success).toHaveProperty('close');

    const warning = useMessage.warning('warning msg');
    expect(warning).toHaveProperty('close');

    const error = useMessage.error('error msg');
    expect(error).toHaveProperty('close');
  });

  it('closeAll 应该关闭所有消息', () => {
    useMessage.show('msg1');
    useMessage.show('msg2');

    useMessage.closeAll();

    expect(containerEl.remove).toHaveBeenCalled();
  });
});
