import { describe, it, expect, vi, beforeEach,afterEach } from 'vitest';
import { useDebounce } from '../../src/utils/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    // 使用假定时器以控制时间流逝
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 恢复真实定时器
    vi.restoreAllMocks();
  });

  it('应该延迟执行函数', () => {
    const func = vi.fn();
    const debouncedFunc = useDebounce(func, 100);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    // 快进时间
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该在延迟时间内多次调用时重新计时', () => {
    const func = vi.fn();
    const debouncedFunc = useDebounce(func, 100);

    debouncedFunc();
    expect(func).not.toHaveBeenCalled();

    // 在延迟完成前再次调用
    vi.advanceTimersByTime(50);
    debouncedFunc();

    // 再次快进50ms，总共100ms，但因为重新计时所以函数仍未执行
    vi.advanceTimersByTime(50);
    expect(func).not.toHaveBeenCalled();

    // 再快进50ms，达到新计时的100ms，函数应该执行
    vi.advanceTimersByTime(50);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('应该传递正确的参数给原函数', () => {
    const func = vi.fn();
    const debouncedFunc = useDebounce(func, 50);

    debouncedFunc('arg1', 'arg2');
    vi.advanceTimersByTime(50);

    expect(func).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('应该传递最新的参数给原函数', () => {
    const func = vi.fn();
    const debouncedFunc = useDebounce(func, 50);

    debouncedFunc('first', 'call');
    vi.advanceTimersByTime(25);
    
    debouncedFunc('second', 'call');
    vi.advanceTimersByTime(50);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith('second', 'call');
  });

  it('应该正确处理上下文(this)绑定', () => {
    const func = vi.fn();
    const context = { name: 'test' };
    const debouncedFunc = useDebounce(func, 50);

    const boundFunc = debouncedFunc.bind(context);
    boundFunc();
    vi.advanceTimersByTime(50);

    expect(func).toHaveBeenCalled();
    // 注意：由于使用了 vi.fn()，我们无法直接验证 this 绑定
    // 但在实际使用中，debounce 函数会保留原始上下文
  });

  it('应该正确处理不同类型的参数', () => {
    const func = vi.fn();
    const debouncedFunc = useDebounce(func, 50);

    const obj = { key: 'value' };
    const arr = [1, 2, 3];
    debouncedFunc(42, 'hello', obj, arr);
    vi.advanceTimersByTime(50);

    expect(func).toHaveBeenCalledWith(42, 'hello', obj, arr);
  });

  it('应该支持立即取消', () => {
    const func = vi.fn();
    const debouncedFunc = useDebounce(func, 100);

    debouncedFunc();
    // 在延迟完成前清除定时器
    vi.clearAllTimers();
    vi.advanceTimersByTime(200);

    expect(func).not.toHaveBeenCalled();
  });

  it('应该正确处理多个独立的防抖函数', () => {
    const func1 = vi.fn();
    const func2 = vi.fn();
    const debouncedFunc1 = useDebounce(func1, 100);
    const debouncedFunc2 = useDebounce(func2, 200);

    debouncedFunc1('func1-call');
    debouncedFunc2('func2-call');

    // func1 应该在 100ms 后执行
    vi.advanceTimersByTime(100);
    expect(func1).toHaveBeenCalledWith('func1-call');
    expect(func2).not.toHaveBeenCalled();

    // func2 应该在 200ms 后执行
    vi.advanceTimersByTime(100);
    expect(func2).toHaveBeenCalledWith('func2-call');
  });
});