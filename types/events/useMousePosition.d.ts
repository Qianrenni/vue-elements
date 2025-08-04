/**
 * 鼠标位置跟踪钩子
 * 功能：监听鼠标移动事件，返回实时坐标 {x, y}
 * 特性：自动管理事件监听（多个组件共用时仅绑定一次事件）
 */
export declare const useMousePosition: () => {
    x: import("vue").Ref<number, number>;
    y: import("vue").Ref<number, number>;
};
