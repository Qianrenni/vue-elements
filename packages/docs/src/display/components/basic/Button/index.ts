import { createDemo } from '@/display/shared/create-demo';
import { QButton, type QButtonProps } from 'qyani-components';

import { buttonDemoConfig } from './config';

/**
 * Button 组件展示页入口。
 *
 * 由 `config.ts` 声明可枚举的 props，本文件负责把目标组件与配置交给 createDemo：
 * createDemo 把候选项渲染成控件，并把当前选中的 props 注入唯一一个 QButton。
 */
export default createDemo<QButtonProps>({
  name: 'DisplayBasicButton',
  component: QButton,
  tagName: 'QButton',
  config: buttonDemoConfig,
});
