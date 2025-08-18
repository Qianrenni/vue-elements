// src/composables/useComponentScanner.ts
import {ref} from 'vue'

export interface ComponentInfo {
    category: string        // 文件所在目录名（如 button, input）
    name: string            // 文件名（如 QButton）
    displayName: string     // 显示名（如 Button）
    vuePath: string         // 源文件路径（/src/.../*.vue 或 .ts）
    docPath: string         // 文档路径（/docs/.../*.docs）
    docContent: string      // 文档内容
    displayPath: string     // 显示路径（/display/...）
}

const components = ref<ComponentInfo[]>([])

export function useComponentScanner() {
    return {
        components,
        loadComponents: async () => {
            // 🔍 扫描 src 下所有 .vue 和 .ts 文件（任意深度）
            const vueModules = import.meta.glob('/src/**/*.{vue,ts}', {eager: false})

            const list: ComponentInfo[] = []

            for (const [vuePath, _] of Object.entries(vueModules)) {
                // 跳过非实际模块或特殊文件
                if (!vuePath || vuePath.endsWith('.d.ts')) continue

                // 示例：/src/components/basic/QButton.vue
                // 或：/src/hooks/useModal.ts

                // 提取路径中不包含扩展名的文件名（QButton）
                const nameMatch = vuePath.match(/\/([^/]+?)\.(vue|ts)$/)
                if (!nameMatch) continue
                const name = nameMatch[1]
                const displayName = name.startsWith('Q') ? name.slice(1) : name

                // 获取文件所在目录（作为 category）
                const dirMatch = vuePath.match(/\/src\/(.+)\/[^/]+?\.(vue|ts)$/)
                const category = dirMatch ? dirMatch[1] : 'other' // 如 'components/basic'

                // ✅ 构造路径：src → docs（.docs），src → display（路径）
                const docPath = vuePath.replace(/^\/src/, '/docs').replace(/\.(vue|ts)$/, '.md')
                const displayPath = vuePath.replace(/^\/src/, '/display').replace('.ts', '.vue');

                let docContent = '> 暂无文档'
                try {
                    const res = await fetch(docPath)
                    if (res.ok) {
                        docContent = await res.text()
                    }
                } catch (e) {
                    console.warn(`[文档加载失败] ${docPath}`, e)
                }

                list.push({
                    category,
                    name,
                    displayName,
                    vuePath,
                    docPath,
                    docContent,
                    displayPath,
                })
            }

            // ✅ 排序：先按 category（路径），再按 displayName
            list.sort((a, b) => {
                if (a.category !== b.category) {
                    return a.category.localeCompare(b.category)
                }
                return a.displayName.localeCompare(b.displayName)
            })

            components.value = list
        },
    }
}
