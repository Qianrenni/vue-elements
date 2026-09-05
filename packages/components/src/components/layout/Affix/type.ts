/**
 * 滚动目标：返回需要监听其滚动事件的容器（window 或元素）。
 * 未提供时默认监听 window。
 */
export type QAffixTarget = () => Window | HTMLElement | null;

/** QAffix 组件 Props */
export interface QAffixProps {
  /**
   * @property offsetTop
   * @defaultValue 无（等价 0）
   * @description 距离滚动容器顶部触发固定的偏移(px)
   */
  offsetTop?: number;
  /**
   * @property offsetBottom
   * @defaultValue 无
   * @description 距离滚动容器底部触发固定的偏移(px)；设置后按底部固定（与 offsetTop 互斥）
   */
  offsetBottom?: number;
  /**
   * @property target
   * @defaultValue 无（window）
   * @description 返回滚动容器的函数（默认视口 window）
   */
  target?: QAffixTarget;
  /**
   * @property zIndex
   * @defaultValue 100
   * @description 固定态层级
   */
  zIndex?: number;
  /**
   * @property onChange
   * @defaultValue 无
   * @description 固定状态改变时触发的回调
   */
  onChange?: (affixed: boolean) => void;
}
