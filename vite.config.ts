import {defineConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [
        vue(),
        // postcss({
        //     extract: true, // 将 CSS 提取为单独文件
        //     inject: false, // 禁用动态注入
        //     modules: false, // 确保不启用 CSS Modules（除非你需要）
        // })
    ],  // 启用 Vue 插件
    // build: {
    //     lib: {  // 关键：启用库模式
    //         entry: resolve(__dirname, 'src/index.ts'),  // 入口文件（你的组件库主入口）
    //         name: 'QyaniComponents',  // 库的全局变量名（UMD 格式时用到）
    //         formats: ['es', 'cjs', 'umd'],  // 输出格式：ESM + CommonJS + UMD
    //         fileName: (format) => `qyani-components.${format}.js`,  // 输出文件名
    //     },
    //     rollupOptions: {
    //
    //         external: ['vue'],  // 外部化 Vue（避免打包 Vue）
    //         output: {
    //             globals: {  // 全局变量映射（UMD 格式时用到）
    //                 vue: 'Vue'
    //             },
    //         },
    //     },
    // },
    server: {
        port: 8080,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
