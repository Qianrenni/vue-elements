/** 默认环绕时长(秒) */
export const DEFAULT_BORDER_BEAM_DURATION = 6;
/** 默认可见弧长 */
export const DEFAULT_BORDER_BEAM_SIZE = 100;
/** 默认线宽 */
export const DEFAULT_BORDER_BEAM_LINE_WIDTH = 1;
/** 默认光束数 */
export const DEFAULT_BORDER_BEAM_COUNT = 1;
/** 默认颜色 */
export const DEFAULT_BORDER_BEAM_COLOR = 'var(--q-color-primary)';

/** 角度范围上限/下限 */
const MIN_SWEEP_DEG = 20;
const MAX_SWEEP_DEG = 300;

/**
 * 数字 → CSS 长度
 * @param value 数值（视为 px）或 CSS 长度字符串
 */
export function toCssLength(value?: number | string): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  return typeof value === 'number' ? `${value}px` : String(value);
}

/**
 * 将 size（px 语义）换算为光束弧段角度
 * @param size 弧长（数字 px 或字符串）
 */
export function sweepDegrees(size?: number | string): number {
  if (typeof size === 'string') {
    const num = parseFloat(size);
    const deg = Number.isNaN(num) ? DEFAULT_BORDER_BEAM_SIZE : num * 0.5;
    return clampSweep(deg);
  }
  const deg = (size ?? DEFAULT_BORDER_BEAM_SIZE) * 0.5;
  return clampSweep(deg);
}

function clampSweep(deg: number): number {
  return Math.min(MAX_SWEEP_DEG, Math.max(MIN_SWEEP_DEG, deg));
}

/**
 * 构建重复锥形渐变：每段=一个「前亮尾淡」的光束，均匀分布于 count 段
 * @param color 光束颜色
 * @param count 光束数（>=1 整数）
 * @param arcDeg 单段可见弧角度
 */
export function buildBeamGradient(
  color: string,
  count: number,
  arcDeg: number,
): string {
  const safeCount = Math.max(1, Math.floor(count) || 1);
  const period = 360 / safeCount;
  const arc = Math.min(arcDeg, period);
  const head = arc * 0.25; // 头部亮度区
  const tail = arc * 0.7;
  return (
    `repeating-conic-gradient(from var(--q-bb-angle, 0deg), ` +
    `transparent 0deg, transparent ${(arc * 0.1).toFixed(1)}deg, ` +
    `${color} ${head.toFixed(1)}deg, ${color} ${(arc * 0.55).toFixed(1)}deg, ` +
    `transparent ${tail.toFixed(1)}deg, transparent ${period.toFixed(1)}deg)`
  );
}

/** useQBorderBeam 所需派生参数 */
export interface QBorderBeamDerived {
  color: string;
  count: number;
  duration: number;
  gradient: string;
  lineWidth: string;
  outset: string;
}

/**
 * 由 props 派生 QBorderBeam 渲染参数（纯函数，便于测试）
 * @param props 组件 Props
 */
export function deriveBorderBeam(props: {
  color?: string;
  count?: number;
  duration?: number;
  size?: number | string;
  lineWidth?: number | string;
  outset?: number | string;
}): QBorderBeamDerived {
  const color = props.color || DEFAULT_BORDER_BEAM_COLOR;
  const count = Math.max(
    1,
    Math.floor(props.count ?? DEFAULT_BORDER_BEAM_COUNT),
  );
  const duration =
    props.duration !== undefined && props.duration > 0
      ? props.duration
      : DEFAULT_BORDER_BEAM_DURATION;
  const lineWidth =
    toCssLength(props.lineWidth) ?? `${DEFAULT_BORDER_BEAM_LINE_WIDTH}px`;
  const outset = toCssLength(props.outset) ?? '0px';
  const gradient = buildBeamGradient(color, count, sweepDegrees(props.size));
  return { color, count, duration, gradient, lineWidth, outset };
}
