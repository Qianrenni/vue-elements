// docs/.vitepress/config.ts

import {DefaultTheme, defineConfig} from 'vitepress'
import {readdir} from 'node:fs/promises'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 生成数组形式的 sidebar
async function getSidebar(): Promise<DefaultTheme.Sidebar> {
    const sidebar: DefaultTheme.SidebarItem[] = []

    // 通用函数：添加分组
    const addGroup = async (dir: string, text: string) => {
        const fullPath = join(__dirname, '..', dir)
        try {
            const files = await readdir(fullPath)
            const items = files
                .filter(file => file.endsWith('.md'))
                .map(file => {
                    const label = file.replace('.md', '')
                    const link = `/${dir}/${label}`
                    return {text: label, link}
                })
                .sort((a, b) => a.text.localeCompare(b.text))

            if (items.length > 0) {
                sidebar.push({
                    text,
                    items
                })
            }
        } catch (e) {
            console.warn(`⚠️ 无法读取目录: ${fullPath}`)
        }
    }

    // 按顺序添加分组
    await addGroup('components/basic', '基础组件')
    await addGroup('components/display', '展示组件')
    await addGroup('components/form', '表单组件')
    await addGroup('components/layout', '布局组件')
    await addGroup('components/navigation', '导航组件')
    await addGroup('components/Sql', 'SQL 组件')
    await addGroup('components/theme', '主题组件')

    await addGroup('events', '事件 Hooks')
    await addGroup('utils', '工具函数')
    await addGroup('types', '类型定义')
    await addGroup('style', '样式与设计')
    await addGroup('template', '模板')

    return sidebar
}

export default defineConfig(async () => {
    const sidebar = await getSidebar()
    return {
        lang: 'zh-CN',
        title: 'Qyani 组件库文档',
        description: '基于 VitePress 的 Vue 组件文档',
        themeConfig: {
            nav: [
                {text: '首页', link: '/'},
            ],

            // ✅ 直接赋值数组
            sidebar,

            socialLinks: [
                {icon: 'github', link: 'https://github.com/your-username/qyani-components'}
            ],

            footer: {
                message: 'MIT Licensed',
                copyright: 'Copyright © 2024'
            },

            search: {
                provider: 'local'
            },

            backToTop: true
        },

        lastUpdated: true,
        cleanUrls: true,
        vue: {
            reactivityTransform: false
        },
    }
})