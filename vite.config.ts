import {defineConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue()
    ],  // 启用 Vue 插件
    build: {
        lib: {  // 关键：启用库模式
            entry: resolve(__dirname, 'src/index.ts'),  // 入口文件（你的组件库主入口）
            name: 'QyaniComponents',  // 库的全局变量名（UMD 格式时用到）
            formats: ['es', 'cjs', 'umd'],  // 输出格式：ESM + CommonJS + UMD
            fileName: (format) => `qyani-components.${format}.js`,  // 输出文件名
        },
        rollupOptions: {
            // 确保外部化处理 vue，避免打包进库
            external: ['vue'],
            output: {
                // 将所有 CSS 合并为一个文件
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith('.css')) {
                        return 'style.css' // 输出为 style.css
                    }
                    return 'assets/[name]-[hash][extname]'
                },
                globals: {
                    vue: 'Vue'
                }
            }
        },
        // 强制将所有 CSS 提取到一个文件（可选）
        cssCodeSplit: false
    },
    server: {
        port: 8080,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
