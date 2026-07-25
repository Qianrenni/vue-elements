import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()], // 启用 Vue 插件
  build: {
    lib: {
      // 关键：启用库模式
      entry: path.resolve(__dirname, 'src/index.ts'), // 入口文件（你的组件库主入口）
      name: 'QyaniComponents', // 库的全局变量名（UMD 格式时用到）
      formats: ['es', 'cjs', 'umd'], // 输出格式：ESM + CommonJS + UMD
      fileName: (format) => `qyani-components.${format}.js`, // 输出文件名
    },
    rollupOptions: {
      // 确保外部化处理 vue，避免打包进库
      external: ['vue'],
      output: {
        // 将所有 CSS 合并为一个文件
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css'; // 输出为 style.css
          }
          return 'assets/[name]-[hash][extname]';
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
    // 强制将所有 CSS 提取到一个文件（可选）
    cssCodeSplit: false,
  },
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        'src/**/*.test.ts',
        'src/**/index.ts',
        'src/**/type.ts',
        'src/types/**',
        'src/**/*.d.ts',
        '**/*.d.ts',
        'vite.config.ts',
        'test/**',
      ],
    },
    // 通过 projects 分离两套测试环境：
    // - node：纯逻辑测试（默认），部分文件用 `// @vitest-environment jsdom` 注解切换
    // - browser：组件渲染测试，跑在真实浏览器（Playwright），使用 vitest-browser-vue
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          setupFiles: ['./test/setup.ts'],
          exclude: [
            '**/node_modules/**',
            '**/dist/**',
            'src/components/**/*.render.test.ts',
          ],
        },
      },
      {
        extends: true,
        test: {
          name: 'browser',
          environment: 'browser',
          include: ['src/components/**/*.render.test.ts'],
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
