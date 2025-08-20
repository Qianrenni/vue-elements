// query-schema.js

export type SqlFieldType = 'string' | 'number' | 'boolean' | 'datetime';
export type SqlOperator = 'between' | '=' | '!=' | '>' | '<' | '>=' | '<=';
export type SqlValue = number | string | null | undefined | number[] | string[] | null[] | undefined[];
export const SQL_FIELD_TYPES: { [key in SqlFieldType]: { operators: SqlOperator[] } } = {
    number: {
        // label: '数值',
        operators: ['=', '!=', '>', '<', '>=', '<=', 'between'],
    },
    string: {
        // label: '文本',
        operators: ['=', '!=', '>', '<', 'between'],
    },
    datetime: {
        // label: '时间',
        operators: ['between'],
    },
    boolean: {
        // label: '布尔',
        operators: ['='],
    },
};

// 操作符语义定义（全局唯一）
export const SQL_OPERATORS: { [key in SqlOperator]: Record<string, string> } = {
    '=': {label: '等于', expects: 'single'},
    '!=': {label: '不等于', expects: 'single'},
    '>': {label: '大于', expects: 'single'},
    '<': {label: '小于', expects: 'single'},
    '>=': {label: '大于等于', expects: 'single'},
    '<=': {label: '小于等于', expects: 'single'},
    between: {label: '介于', expects: 'range'}, // 需要两个值
    // in: {label: '属于', expects: 'list'},           // 值为数组，如 [1,2,3]
    // contains: {label: '包含', expects: 'single'},
    // starts_with: {label: '以...开头', expects: 'single'}
};
export type SqlField = {
    // 字段类型
    type: SqlFieldType;
    // 字段名
    name: string;
    // 字段标签
    label: string;
    // 字段格式化
    formatter?: (val: SqlValue) => SqlValue;
    isDefault?: boolean;
};
export type Condition = {
    field: string;
    operator: SqlOperator | '';
    value: SqlValue;
    type: keyof typeof SQL_FIELD_TYPES;
};

// ========== 类型定义 ==========
export interface SqlRenderProps {
    type: SqlFieldType;
    modelValue: SqlValue;
    'onUpdate:modelValue': (val: SqlValue) => void;
}

//
// // ========== 类型 → 基础组件映射 ==========
// export const SQL_TYPE_TO_COMPONENT: Record<string, Component> = {
//     string: ElInput,
//     number: ElInputNumber,
//     boolean: ElSwitch,
//     datetime: ElDatePicker,
// };
//
// function isArrayValue(value: SqlValue): value is number[] | string[] | null[] | undefined[] {
//     return Array.isArray(value) && value.length === 2;
// }
//
// // ========== 操作符 → 渲染函数映射 ==========
// export const SQL_OPERATOR_TO_COMPONENT: {
//     [key: string]: (props: SqlRenderProps) => ReturnType<typeof h>;
// } = {
//     // 范围输入
//     range: (props) => {
//         if (!isArrayValue(props.modelValue)) {
//             Promise.resolve().then(() => {
//                 props['onUpdate:modelValue']([undefined, undefined]);
//             });
//         }
//         const safeValue0 = isArrayValue(props.modelValue) ? props.modelValue[0] : undefined;
//         const safeValue1 = isArrayValue(props.modelValue) ? props.modelValue[1] : undefined;
//         if (props.type === 'datetime') {
//             return h(ElDatePicker, {
//                 type: 'datetimerange',
//                 modelValue: props.modelValue as [],
//                 'onUpdate:modelValue': props['onUpdate:modelValue'],
//                 startPlaceholder: '开始时间',
//                 endPlaceholder: '结束时间',
//             });
//         }
//         if (props.type === 'number') {
//             // 数值范围
//             return h('div', {style: 'display: flex; align-items: center; gap: 6px;'}, [
//                 h(ElInputNumber, {
//                     modelValue: safeValue0 as number | undefined,
//                     'onUpdate:modelValue': (val: number | undefined) => {
//                         props['onUpdate:modelValue']([val, safeValue1] as SqlValue);
//                     },
//                 }),
//                 h('span', '~'),
//                 h(ElInputNumber, {
//                     modelValue: safeValue1 as number | undefined,
//                     'onUpdate:modelValue': (val: number | undefined) => {
//                         props['onUpdate:modelValue']([safeValue0, val] as SqlValue);
//                     },
//                 }),
//             ]);
//         }
//         return h('div', {style: 'display: flex; align-items: center; gap: 6px;min-width: 300px;'}, [
//             h(ElInput, {
//                 modelValue: safeValue0,
//                 'onUpdate:modelValue': (v: string | null | undefined) => {
//                     props['onUpdate:modelValue']([v, safeValue1] as SqlValue);
//                 },
//                 placeholder: '起始值',
//             }),
//             h('span', '~'),
//             h(ElInput, {
//                 modelValue: safeValue1,
//                 'onUpdate:modelValue': (v: string | null | undefined) => {
//                     props['onUpdate:modelValue']([safeValue0, v] as SqlValue);
//                 },
//                 placeholder: '结束值',
//             }),
//         ]);
//     },
//
//     // 列表输入（in）
//     list: (props) => {
//         return h(ElInput, {
//             modelValue: Array.isArray(props.modelValue) ? props.modelValue.map(String).join(', ') : '',
//             'onUpdate:modelValue': (val: string) => {
//                 const arr = val
//                     ? val
//                         .split(',')
//                         .map((s) => s.trim())
//                         .filter(Boolean)
//                     : [];
//                 const parsed = props.type === 'number' ? arr.map((x) => (isNaN(Number(x)) ? x : Number(x))) : arr;
//                 props['onUpdate:modelValue'](parsed as SqlValue);
//             },
//             placeholder: '用逗号分隔多个值',
//         });
//     },
//
//     // 单值输入
//     single: (props) => {
//         const component = SQL_TYPE_TO_COMPONENT[props.type] || ElInput;
//
//         const commonProps = {
//             modelValue: props.modelValue,
//             'onUpdate:modelValue': props['onUpdate:modelValue'],
//         };
//
//         if (props.type === 'datetime') {
//             return h(component, {
//                 ...commonProps,
//                 type: 'datetime',
//                 placeholder: '选择时间',
//             });
//         }
//
//         if (props.type === 'boolean') {
//             return h(component, commonProps);
//         }
//
//         return h(component, {
//             ...commonProps,
//             placeholder: '请输入值',
//         });
//     },
// };
