/**
 * QAffix 纯逻辑（对齐 Ant Design Affix 的固定判定算法）。
 * 组件通过 `getBoundingClientRect()` 得到占位盒/目标容器矩形后调用本模块函数。
 */

/** 通用矩形信息（对齐 getBoundingClientRect 所需字段） */
export interface QAffixRect {
  top: number;
  bottom: number;
  left: number;
  width: number;
  height: number;
}

/** 固定状态描述（同时驱动 fixed 样式与占位尺寸） */
export interface QAffixState {
  /** 固定模式 */
  mode: 'top' | 'bottom';
  /** mode=top 时：fixed 元素的 CSS top(px) */
  top?: number;
  /** mode=bottom 时：fixed 元素的 CSS bottom(px) */
  bottom?: number;
  /** 占位宽(px) */
  width: number;
  /** 占位高(px) */
  height: number;
}

/** 默认顶部偏移：offsetTop / offsetBottom 均未设置时等价于 offsetTop=0 */
export const AFFIX_DEFAULT_OFFSET_TOP = 0;

/** 默认层级 */
export const AFFIX_DEFAULT_Z_INDEX = 100;

/**
 * 获取滚动目标的可视矩形
 * @param target 滚动容器（HTMLElement；无 getBoundingClientRect 的 window/null 视为视口）
 * @param viewportHeight 视口高度（window.innerHeight）
 */
export function getTargetRect(
  target: Window | HTMLElement | null,
  viewportHeight: number,
): QAffixRect {
  const el = target as HTMLElement | null;
  if (el && typeof el.getBoundingClientRect === 'function') {
    const r = el.getBoundingClientRect();
    return {
      top: r.top,
      bottom: r.bottom,
      left: r.left,
      width: r.width,
      height: r.height,
    };
  }
  return { top: 0, bottom: viewportHeight, left: 0, width: 0, height: 0 };
}

/**
 * 计算「吸顶固定」的 fixed top（未命中返回 undefined）
 * 命中条件：占位盒顶部已滚到 pinLine（targetRect.top + offsetTop）之上。
 */
export function getFixedTop(
  placeholderRect: Pick<QAffixRect, 'top'>,
  targetRect: Pick<QAffixRect, 'top'>,
  offsetTop: number | undefined,
): number | undefined {
  if (
    offsetTop !== undefined &&
    Math.round(targetRect.top) > Math.round(placeholderRect.top) - offsetTop
  ) {
    return offsetTop + targetRect.top;
  }
  return undefined;
}

/**
 * 计算「吸底固定」的 fixed bottom（未命中返回 undefined）
 * 命中条件：占位盒底部已滚到 pinLine（targetRect.bottom - offsetBottom）之下。
 */
export function getFixedBottom(
  placeholderRect: Pick<QAffixRect, 'bottom'>,
  targetRect: Pick<QAffixRect, 'bottom'>,
  offsetBottom: number | undefined,
  viewportHeight: number,
): number | undefined {
  if (
    offsetBottom !== undefined &&
    Math.round(targetRect.bottom) <
      Math.round(placeholderRect.bottom) + offsetBottom
  ) {
    const targetBottomOffset = viewportHeight - targetRect.bottom;
    return offsetBottom + targetBottomOffset;
  }
  return undefined;
}

/** computeAffixState 参数 */
export interface ComputeAffixStateOptions {
  /** 顶部偏移 */
  offsetTop?: number;
  /** 底部偏移 */
  offsetBottom?: number;
  /** 视口高度（window.innerHeight） */
  viewportHeight: number;
}

/**
 * 汇总计算固定状态：命中吸顶则优先返回 top 模式，否则命中吸底返回 bottom 模式，否则返回 null。
 * @param placeholderRect 占位盒矩形（内容在普通文档流中的位置）
 * @param targetRect 滚动目标可视矩形
 * @param options 偏移与视口信息
 */
export function computeAffixState(
  placeholderRect: QAffixRect,
  targetRect: QAffixRect,
  options: ComputeAffixStateOptions,
): QAffixState | null {
  const internalOffsetTop =
    options.offsetTop === undefined && options.offsetBottom === undefined
      ? AFFIX_DEFAULT_OFFSET_TOP
      : options.offsetTop;
  const fixedTop = getFixedTop(placeholderRect, targetRect, internalOffsetTop);
  if (fixedTop !== undefined) {
    return {
      mode: 'top',
      top: fixedTop,
      width: placeholderRect.width,
      height: placeholderRect.height,
    };
  }
  const fixedBottom = getFixedBottom(
    placeholderRect,
    targetRect,
    options.offsetBottom,
    options.viewportHeight,
  );
  if (fixedBottom !== undefined) {
    return {
      mode: 'bottom',
      bottom: fixedBottom,
      width: placeholderRect.width,
      height: placeholderRect.height,
    };
  }
  return null;
}
