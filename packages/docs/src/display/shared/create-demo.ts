import DemoBlock from '@/DemoBlock.vue';
import { QInput, QSelect, QSwitch } from 'qyani-components';
import type { SelectModelValue } from 'qyani-components';
import {
  type Component,
  type CSSProperties,
  defineComponent,
  h,
  reactive,
  type Ref,
  ref,
  type VNode,
} from 'vue';

import { generateComponentCode } from './code-generator';
import type { DemoConfig, DemoControl } from './type';

/** 控件网格样式 */
const GRID_STYLE: CSSProperties = {
  display: 'grid',
  gap: '0.75rem 1.5rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(13rem, 1fr))',
  width: '100%',
};

/** 单个控件行样式 */
const ROW_STYLE: CSSProperties = {
  alignItems: 'center',
  display: 'flex',
  gap: '0.5rem',
};

/** 控件标签样式 */
const LABEL_STYLE: CSSProperties = {
  color: 'var(--q-color-text-secondary, #666)',
  flex: '0 0 5rem',
  fontSize: '0.8125rem',
};

/** 控件的布局样式：外观交给 Q 组件自身，这里只负责撑满控件列 */
const CONTROL_STYLE: CSSProperties = {
  flex: 1,
  minWidth: 0,
};

/** 开关的布局样式：保持自身尺寸，不参与拉伸 */
const SWITCH_LAYOUT: CSSProperties = {
  flex: 'none',
};

/** 预览区样式：唯一实例居中，block 形态自动撑满整行 */
const PREVIEW_STYLE: CSSProperties = {
  alignItems: 'center',
  borderBottom: '1px dashed var(--q-color-border-light, #e5e5e5)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingBottom: '1.25rem',
  width: '100%',
};

/** 演示根容器样式 */
const ROOT_STYLE: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  width: '100%',
};

/** 引擎内部的运行时 prop 描述（脱离 Props 约束，统一按 unknown 处理） */
interface RuntimePropEntry {
  name: string;
  label?: string;
  control?: DemoControl;
  values?: readonly unknown[];
  initialValue?: unknown;
  optional?: boolean;
}

/**
 * 把类型安全的 demo prop 配置转换为运行时视图（去掉 Props 约束）。
 *
 * @param entries config.ts 中声明的 props 配置
 * @returns 运行时 prop 描述列表
 */
function toRuntimeEntries(
  entries: readonly {
    name: unknown;
    label?: string;
    control?: DemoControl;
    values?: readonly unknown[];
    initialValue?: unknown;
    optional?: boolean;
  }[],
): RuntimePropEntry[] {
  return entries.map((entry) => ({
    name: String(entry.name),
    label: entry.label,
    control: entry.control,
    values: entry.values,
    initialValue: entry.initialValue,
    optional: entry.optional,
  }));
}

/**
 * 推断控件形态。
 *
 * @param entry 运行时 prop 描述
 * @returns 控件形态：显式配置优先；无枚举 → input；布尔二选 → switch；其余 → select
 */
function resolveControl(entry: RuntimePropEntry): DemoControl {
  if (entry.control) return entry.control;
  const values = entry.values;
  if (!values || values.length === 0) return 'input';
  if (
    values.length === 2 &&
    values.every((value) => typeof value === 'boolean')
  ) {
    return 'switch';
  }
  return 'select';
}

/**
 * 取 prop 的初始值。
 *
 * @param entry 运行时 prop 描述
 * @returns 初始值；input 控件 / optional 且无 initialValue 时返回 undefined（表示不注入该 prop）
 */
function resolveInitialValue(entry: RuntimePropEntry): unknown {
  if (entry.initialValue !== undefined) return entry.initialValue;
  if (entry.optional) return undefined;
  return entry.values?.[0];
}

/**
 * 渲染枚举下拉（QSelect）。
 *
 * options 以下标作为选项值，避免原始值经 Select 归一化后丢失类型（如数字变字符串）。
 *
 * @param entry 运行时 prop 描述
 * @param state 当前注入的 props
 * @returns 下拉控件 VNode
 */
function renderSelect(
  entry: RuntimePropEntry,
  state: Record<string, unknown>,
): VNode {
  const values = entry.values ?? [];
  const name = entry.name;
  const current = state[name];

  return h(QSelect, {
    allowClear: entry.optional ?? false,
    options: values.map((value, index) => ({
      label: String(value),
      value: index,
    })),
    placeholder: '未设置',
    size: 'small',
    style: CONTROL_STYLE,
    value: current === undefined ? undefined : values.indexOf(current),
    'onUpdate:value': (value: SelectModelValue) => {
      // 清除（undefined）→ 不注入该 prop，回退到组件默认值
      state[name] = typeof value === 'number' ? values[value] : undefined;
    },
  });
}

/**
 * 渲染布尔开关（QSwitch）。
 *
 * @param entry 运行时 prop 描述
 * @param state 当前注入的 props
 * @returns 开关控件 VNode
 */
function renderSwitch(
  entry: RuntimePropEntry,
  state: Record<string, unknown>,
): VNode {
  const name = entry.name;

  return h(QSwitch, {
    size: 'small',
    style: SWITCH_LAYOUT,
    value: Boolean(state[name]),
    'onUpdate:value': (value: boolean) => {
      state[name] = value;
    },
  });
}

/**
 * 渲染文本输入（QInput），用于无法枚举的 prop。
 *
 * @param entry 运行时 prop 描述
 * @param state 当前注入的 props
 * @returns 文本控件 VNode
 */
function renderInput(
  entry: RuntimePropEntry,
  state: Record<string, unknown>,
): VNode {
  const name = entry.name;
  const current = state[name];

  return h(QInput, {
    allowClear: true,
    placeholder: '未设置',
    size: 'small',
    style: CONTROL_STYLE,
    value: current === undefined ? '' : String(current),
    'onUpdate:value': (value: string) => {
      // 清空 = 不注入该 prop，避免空字符串被当成有效值
      state[name] = value === '' ? undefined : value;
    },
  });
}

/**
 * 按推断出的控件形态分发到具体控件。
 *
 * @param entry 运行时 prop 描述
 * @param control 已推断出的控件形态
 * @param state 当前注入的 props（双向绑定的目标）
 * @returns 控件 VNode
 */
function renderControl(
  entry: RuntimePropEntry,
  control: DemoControl,
  state: Record<string, unknown>,
): VNode {
  if (control === 'switch') return renderSwitch(entry, state);
  if (control === 'input' || (entry.values ?? []).length === 0) {
    return renderInput(entry, state);
  }
  return renderSelect(entry, state);
}

/**
 * 渲染单个控件行（标签 + 控件）。
 *
 * 用 div 而非 label 包裹：label 会把内部点击再派发给第一个表单控件，
 * 而 QSelect / QSwitch 自身含 input / button，会被二次触发（下拉选完又弹开、开关被切两次）。
 *
 * @param entry 运行时 prop 描述
 * @param state 当前注入的 props
 * @returns 控件行 VNode
 */
function renderControlRow(
  entry: RuntimePropEntry,
  state: Record<string, unknown>,
): VNode {
  return h('div', { style: ROW_STYLE }, [
    h('span', { style: LABEL_STYLE }, entry.label ?? entry.name),
    renderControl(entry, resolveControl(entry), state),
  ]);
}

/**
 * 渲染默认插槽内容输入框（可直接改文案，源码片段同步更新）。
 *
 * @param text 插槽文本 ref
 * @returns 控件行 VNode
 */
function renderTextRow(text: Ref<string>): VNode {
  return h('div', { style: ROW_STYLE }, [
    h('span', { style: LABEL_STYLE }, '插槽内容'),
    h(QInput, {
      size: 'small',
      style: CONTROL_STYLE,
      value: text.value,
      'onUpdate:value': (value: string) => {
        text.value = value;
      },
    }),
  ]);
}

/**
 * 依据 `config.ts` 的声明生成配置驱动的演示组件。
 *
 * `config.ts` 只声明「哪些 props 可调、各自有哪些候选值」；本函数把候选项渲染成控件，
 * 把当前选中的 props 注入**唯一一个**目标组件实例，并反向生成可复制的源码片段。
 *
 * @param options 演示配置：组件名、目标组件、模板标签名、config.ts 导出的配置
 * @returns 可被 ComponentDetail 直接动态加载的演示组件
 */
export function createDemo<Props extends object>(options: {
  /** 演示组件名（用于 Vue DevTools 与调试） */
  name: string;
  /** 目标组件（props 的注入对象，页面只渲染这一个实例） */
  component: Component;
  /** 源码片段中使用的标签名，如 QButton */
  tagName: string;
  /** config.ts 导出的配置 */
  config: DemoConfig<Props>;
}): Component {
  const { name, component, tagName, config } = options;
  const entries = toRuntimeEntries(config.props);
  const fixedProps = config.fixedProps as Record<string, unknown> | undefined;
  const namedSlots = Object.entries(config.slots ?? {});

  return defineComponent({
    name,
    setup() {
      /** 当前注入的 props：由 config 初始值建立，随控件交互更新 */
      const state = reactive<Record<string, unknown>>({});
      for (const entry of entries) {
        state[entry.name] = resolveInitialValue(entry);
      }
      const text = ref(config.text ?? '');

      return () => {
        const injected = { ...fixedProps, ...state };
        const slots: Record<string, () => string> = {};
        for (const [slot, content] of namedSlots) {
          slots[slot] = () => content;
        }
        if (text.value !== '') {
          slots.default = () => text.value;
        }

        return h(
          DemoBlock,
          {
            code: generateComponentCode(
              tagName,
              injected,
              text.value,
              config.slots,
            ),
            title: config.title ?? '配置演示',
          },
          () =>
            h('div', { style: ROOT_STYLE }, [
              h('div', { style: PREVIEW_STYLE }, [
                h(component, injected, slots),
              ]),
              h('div', { style: GRID_STYLE }, [
                ...entries.map((entry) => renderControlRow(entry, state)),
                renderTextRow(text),
              ]),
            ]),
        );
      };
    },
  });
}
