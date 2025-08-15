// src/composables/useComponentScanner.ts
import {ref} from 'vue'

export interface ComponentInfo {
    category: string      // 分类名（basic, display）
    name: string          // 组件名（QButton）
    displayName: string   // 显示名（Button）
    vuePath: string       // 组件路径
    docPath: string       // 文档路径
    docContent: string    // 文档内容
}

const components = ref<ComponentInfo[]>([])

export function useComponentScanner() {
    return {
        components,
        loadComponents: async () => {
            // ✅ 扫描所有 /src/components/*/*.vue
            const vueModules = import.meta.glob('/src/components/*/*.vue')

            const list: ComponentInfo[] = []

            for (const [vuePath, _] of Object.entries(vueModules)) {
                // 匹配：/src/components/basic/QButton.vue
                const match = vuePath.match(/\/src\/components\/([^/]+)\/(\w+)\.vue$/)
                if (!match) continue

                const [, category, name] = match
                const displayName = name.startsWith('Q') ? name.slice(1) : name

                // ✅ 构造 .docs 路径：/docs/components/basic/QButton.docs
                const docPath = `/docs/components/${category}/${name}.md`

                // ✅ 尝试加载 .docs（使用 fetch 更安全）
                let docContent = '> 暂无文档'
                try {
                    const res = await fetch(docPath)
                    if (res.ok) {
                        docContent = await res.text()
                    }
                } catch (e) {
                    console.warn(`[文档加载] 失败: ${docPath}`, e)
                }

                list.push({
                    category,
                    name,
                    displayName,
                    vuePath,
                    docPath,
                    docContent
                })
            }

            // ✅ 按分类 + 组件名排序
            list.sort((a, b) => {
                if (a.category !== b.category) {
                    return a.category.localeCompare(b.category)
                }
                return a.displayName.localeCompare(b.displayName)
            })

            components.value = list
        }
    }
}
