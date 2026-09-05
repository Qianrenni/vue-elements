/** 组件尺寸档位 */
export type QConfigComponentSize = 'small' | 'middle' | 'large';

/** 文本方向 */
export type QConfigDirection = 'ltr' | 'rtl';

/** 需注入的 CSS 自定义属性覆盖（如 { '--q-color-primary': '#3b82f6' }） */
export type QConfigCssVars = Record<string, string>;

/** QConfigProvider 组件 Props */
export interface QConfigProviderProps {
  /**
   * @property componentSize
   * @defaultValue 'middle'
   * @description 组件尺寸档位（通过 provide 供子孙组件消费）
   */
  componentSize?: QConfigComponentSize;
  /**
   * @property direction
   * @defaultValue 'ltr'
   * @description 文本方向（rtl 时对子树生效）
   */
  direction?: QConfigDirection;
  /**
   * @property cssVars
   * @defaultValue 无
   * @description CSS 自定义属性覆盖，作用于本节点子树（可实现局部主题定制）
   */
  cssVars?: QConfigCssVars;
  /**
   * @property getPopupContainer
   * @defaultValue 无
   * @description 弹层挂载容器解析函数（供弹层组件消费）
   */
  getPopupContainer?: () => HTMLElement;
  /**
   * @property renderEmpty
   * @defaultValue 无
   * @description 自定义空状态渲染（供空态组件消费）
   */
  renderEmpty?: () => unknown;
}
