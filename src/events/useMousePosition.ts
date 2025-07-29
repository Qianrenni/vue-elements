// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 提升状态到模块作用域（单例模式）
const x = ref(0)
const y = ref(0)
let listenerCount = 0 // 引用计数器

// 统一的事件处理器
const update = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
}

/**
 * 鼠标位置跟踪钩子
 * 功能：监听鼠标移动事件，返回实时坐标 {x, y}
 * 特性：自动管理事件监听（多个组件共用时仅绑定一次事件）
 */
export const useMousePosition = () => {
    // 每当组件挂载时
    onMounted(() => {
        if (listenerCount === 0) {
            window.addEventListener('mousemove', update)
        }
        listenerCount++ // 增加引用计数
    })

    // 每当组件卸载时
    onUnmounted(() => {
        listenerCount--
        if (listenerCount === 0) {
            window.removeEventListener('mousemove', update)
        }
    })

    // 始终返回相同的引用
    return { x, y }
}
