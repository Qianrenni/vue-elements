import { describe, expect, it } from 'vitest';

import { useColorPicker } from '../composable';

describe('useColorPicker', () => {
  describe('color', () => {
    it('无值时应为默认黑色', () => {
      expect(useColorPicker({}).color.value).toBe('#000000');
      expect(useColorPicker({ value: '' }).color.value).toBe('#000000');
    });

    it('有值时应原样返回', () => {
      expect(useColorPicker({ value: '#1677ff' }).color.value).toBe('#1677ff');
    });
  });

  describe('showClear', () => {
    it('未开启 allowClear 时不展示', () => {
      expect(useColorPicker({ value: '#1677ff' }).showClear.value).toBe(false);
    });

    it('开启 allowClear 且有值时才展示', () => {
      expect(
        useColorPicker({ value: '#1677ff', allowClear: true }).showClear.value,
      ).toBe(true);
      expect(useColorPicker({ allowClear: true }).showClear.value).toBe(false);
    });
  });

  describe('isOpen', () => {
    it('缺省应关闭', () => {
      expect(useColorPicker({}).isOpen.value).toBe(false);
    });

    it('非受控模式下可通过写入切换', () => {
      const { isOpen } = useColorPicker({});

      isOpen.value = true;
      expect(isOpen.value).toBe(true);
      isOpen.value = false;
      expect(isOpen.value).toBe(false);
    });

    it('受控模式下应以 props.open 为准', () => {
      expect(useColorPicker({ open: true }).isOpen.value).toBe(true);

      const { isOpen } = useColorPicker({ open: false });
      isOpen.value = true;
      expect(isOpen.value).toBe(false);
    });
  });

  describe('text', () => {
    it('缺省为 hex 格式', () => {
      expect(useColorPicker({}).text.value).toBe('#000000');
    });

    it('rgb 格式应输出 rgb 文案', () => {
      expect(
        useColorPicker({ value: '#ff0000', format: 'rgb' }).text.value,
      ).toBe('rgb(255, 0, 0)');
    });

    it('hsl 格式应输出 hsl 文案', () => {
      expect(
        useColorPicker({ value: '#00ff00', format: 'hsl' }).text.value,
      ).toBe('hsl(120, 100%, 50%)');
    });

    it('三位简写 hex 应能解析', () => {
      expect(useColorPicker({ value: '#f00', format: 'rgb' }).text.value).toBe(
        'rgb(255, 0, 0)',
      );
    });

    it('非法色值应原样返回', () => {
      expect(useColorPicker({ value: 'red', format: 'rgb' }).text.value).toBe(
        'red',
      );
    });
  });

  describe('statusClass', () => {
    it('无状态时应为空串', () => {
      expect(useColorPicker({}).statusClass.value).toBe('');
    });

    it('应按状态生成修饰类', () => {
      expect(useColorPicker({ status: 'error' }).statusClass.value).toBe(
        'q-color-picker--error',
      );
      expect(useColorPicker({ status: 'warning' }).statusClass.value).toBe(
        'q-color-picker--warning',
      );
    });
  });
});
