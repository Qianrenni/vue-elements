/**
 * 配置驱动演示（config-driven demo）类型定义。
 *
 * 约定：每个组件的展示页拆成两个文件——
 * - `config.ts`：只声明数据（哪些 props 可调、各自有哪些候选值），不引用组件；
 * - `index.ts`：把 `config.ts` 与目标组件交给 `createDemo`，解析后注入唯一实例。
 */

/** 演示控件的交互形态 */
export type DemoControl = 'select' | 'switch' | 'input';

/**
 * 单个可调 prop 的配置。
 *
 * `name` 受组件 Props 约束，`values` / `initialValue` 会自动匹配该 prop 的类型，
 * 因此 `{ name: 'type', values: ['primray'] }` 这类拼写错误会在编写期报错。
 */
export interface DemoPropConfig<
  Props extends object,
  Name extends keyof Props = keyof Props,
> {
  /** 目标 prop 名（必须是组件 Props 上的 key） */
  name: Name;
  /** 控件标签，默认取 name */
  label?: string;
  /** 控件形态，默认按 values 推断：无 values → input；布尔二选 → switch；其余 → select */
  control?: DemoControl;
  /** 可枚举的候选值；不配置则渲染为文本输入框 */
  values?: readonly NonNullable<Props[Name]>[];
  /** 初始值，默认取 values[0]；input 控件不配置则初始为空（不注入该 prop） */
  initialValue?: NonNullable<Props[Name]>;
  /**
   * 是否允许「未设置」，默认 false。
   * 为 true 时枚举下拉可清除（QSelect 的 allowClear），清除后不注入该 prop，
   * 回退到组件默认值；未配置 initialValue 时初始即为「未设置」。
   */
  optional?: boolean;
}

/** `DemoConfig.props` 的元素类型：对所有可调 key 的联合，按 name 收窄类型 */
export type DemoPropEntry<Props extends object> = {
  [K in keyof Props]-?: DemoPropConfig<Props, K>;
}[keyof Props];

/** 单个组件的完整演示配置 */
export interface DemoConfig<Props extends object = Record<string, unknown>> {
  /** DemoBlock 标题 */
  title?: string;
  /** 默认插槽文本（同时作为「插槽内容」输入框的初始值） */
  text?: string;
  /** 固定的具名插槽内容：键为插槽名，值为纯文本 */
  slots?: Record<string, string>;
  /** 可调 props 列表：每一项对应一个控件 */
  props: DemoPropEntry<Props>[];
  /** 固定注入、不渲染控件的 props */
  fixedProps?: Partial<Props>;
}
