import { describe, expect, it } from 'vitest';

import {
  defaultMessage,
  isMissing,
  validateRule,
  validateRules,
} from '../composable';
import type { QFormRule } from '../type';

describe('QForm 校验纯逻辑', () => {
  it('isMissing 覆盖空/空串/空数组/空白', () => {
    expect(isMissing(undefined)).toBe(true);
    expect(isMissing(null)).toBe(true);
    expect(isMissing('')).toBe(true);
    expect(isMissing([])).toBe(true);
    expect(isMissing('  ')).toBe(false);
    expect(isMissing('  ', true)).toBe(true);
    expect(isMissing(0)).toBe(false);
  });

  it('required + message', async () => {
    const rule: QFormRule = { required: true, message: '必填' };
    expect(await validateRule(rule, '', {})).toBe('必填');
    expect(await validateRule(rule, 'x', {})).toBeNull();
  });

  it('pattern / min / max / len', async () => {
    const model = {};
    expect(
      await validateRule({ pattern: /^\d+$/ }, 'abc', model),
    ).not.toBeNull();
    expect(await validateRule({ pattern: /^\d+$/ }, '123', model)).toBeNull();
    expect(await validateRule({ min: 6 }, 'ab', model)).toBe(
      '长度/数值不能小于 6',
    );
    expect(await validateRule({ max: 2, message: '最多2' }, 'abc', model)).toBe(
      '最多2',
    );
    expect(await validateRule({ len: 5 }, 'abcd', model)).not.toBeNull();
  });

  it('validator 同步 false/string 与异步', async () => {
    const syncFail = { validator: () => '自定义错误' };
    expect(await validateRule(syncFail, 1, {})).toBe('自定义错误');
    const asyncPass = { validator: async () => true };
    expect(await validateRule(asyncPass, 1, {})).toBeNull();
  });

  it('validateRules 返回第一条失败', async () => {
    const msg = await validateRules(
      [{ required: true }, { pattern: /^\d+$/, message: '需数字' }],
      '',
      {},
    );
    expect(msg).toBe('为必填项');
    expect(
      await validateRules(
        [
          { pattern: /^\d+$/, message: '需数字' },
          { min: 3, message: '过短' },
        ],
        'ab',
        {},
      ),
    ).toBe('需数字');
    expect(
      await validateRules([{ pattern: /^\d+$/ }, { min: 3 }], '12345', {}),
    ).toBeNull();
  });

  it('defaultMessage 提供各缺省文案', () => {
    expect(defaultMessage({ required: true }, '姓名')).toBe('「姓名」为必填项');
  });
});
