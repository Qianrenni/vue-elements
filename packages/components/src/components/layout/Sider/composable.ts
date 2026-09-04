import { computed } from 'vue';
import type { ComputedRef } from 'vue';

import type { SiderProps } from './type';

/** useSider 返回值接口 */
export interface UseSiderReturn {
  /** 当前生效宽度（px） */
  siderWidth: ComputedRef<number>;
  /** 折叠触发器箭头方向 */
  triggerIcon: ComputedRef<string>;
  /** 主题 class */
  themeClass: ComputedRef<string>;
}

/**
 * QSider 组件核心逻辑：依据折叠状态与配置派生宽度 / 主题类。
 *
 * 说明：父级 QLayout 通过检测根元素直接子元素中是否存在 `.q-layout-sider`
 * 自动切换横向布局，因此 QSider 无需向父级注册。
 * @param props 组件 Props
 * @returns 派生状态
 */
export const useSider = (props: SiderProps): UseSiderReturn => {
  /** 当前生效宽度 */
  const siderWidth = computed<number>(() =>
    props.collapsed ? (props.collapsedWidth ?? 80) : (props.width ?? 200),
  );

  /** 折叠触发器箭头方向 */
  const triggerIcon = computed<string>(() => (props.collapsed ? '›' : '‹'));

  /** 主题 class */
  const themeClass = computed<string>(() =>
    props.theme === 'light' ? 'q-layout-sider--light' : 'q-layout-sider--dark',
  );

  return { siderWidth, triggerIcon, themeClass };
};
