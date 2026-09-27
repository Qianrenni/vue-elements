import type { DemoConfig } from '@/display/shared/type';
import type { QButtonProps } from 'qyani-components';

/**
 * QButton 展示页配置。
 *
 * 只声明「哪些 props 可调、各自有哪些候选值」，不引用组件本身；
 * 解析与注入由同目录 `index.ts` 交给 createDemo 完成，页面始终只渲染一个 QButton。
 *
 * 控件形态自动推断：`values` 为布尔二选 → 开关；其余枚举 → 下拉；不配置 `values` → 文本输入。
 */
export const buttonDemoConfig: DemoConfig<QButtonProps> = {
  title: '按钮配置演示',
  text: '按钮',
  props: [
    {
      name: 'type',
      values: ['primary', 'default', 'dashed', 'text', 'link'],
    },
    {
      name: 'level',
      label: 'level 1~6',
      values: [1, 2, 3, 4, 5, 6],
      initialValue: 3,
      optional: true,
    },
    { name: 'danger', values: [false, true] },
    { name: 'ghost', values: [false, true] },
    { name: 'block', values: [false, true] },
    { name: 'loading', values: [false, true] },
    { name: 'disabled', values: [false, true] },
    { name: 'href', control: 'input' },
    { name: 'target', values: ['_self', '_blank'], optional: true },
  ],
};
