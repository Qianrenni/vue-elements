import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

/**
 * 独立构建 install 入口（全局注册）。
 * 主入口 qyani-components 已包含 UMD，Vite 多入口不支持 UMD，
 * 故 install 单独构建为 ESM + CJS，供 `import install from 'qyani-components/install'` 使用。
 */
export default defineConfig({
  plugins: [vue()], // 启用 Vue 插件
  build: {
    // 不清理主入口构建产物（主入口已生成 style.css 等，仅追加 install 产物）
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/install.ts'), // install 入口
      name: 'QyaniComponentsInstall', // 库的全局变量名
      formats: ['es', 'cjs'], // 输出格式：ESM + CommonJS
      fileName: (format) => `qyani-components.install.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理 vue，避免打包进库
      external: ['vue'],
      output: {
        // CSS 输出独立文件，避免覆盖主入口的 style.css
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.install.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        // 消除 named + default 导出一同使用的警告
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
    // 强制将所有 CSS 提取到一个文件
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
