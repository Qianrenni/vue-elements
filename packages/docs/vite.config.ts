import { defineConfig, type Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, dirname, relative } from 'path';

/**
 * 自定义 Vite 插件：将组件库源码中的 @/ 别名替换为相对路径
 * 使组件库源码能直接通过 Vite 的 HMR 管道处理，实现热更新
 */
function resolveComponentsSource(): Plugin {
  // 统一使用正斜杠，确保跨平台兼容
  const componentsSrc = resolve(__dirname, '../components/src').replace(
    /\\/g,
    '/',
  );

  return {
    name: 'resolve-components-source',
    enforce: 'pre',
    // 处理开发模式下 qyani-components/dist/style.css 导入
    // 组件库源码已通过 import './style/...' 注入 CSS，此处提供空模块
    resolveId(id) {
      if (id === 'qyani-components/dist/style.css') {
        return '\0qyani-style.css';
      }
      return null;
    },
    load(id) {
      if (id === '\0qyani-style.css') {
        return '';
      }
      return null;
    },
    // 重写组件库源码中的 @/ 路径为相对路径
    transform(code, id) {
      const normalizedId = id.replace(/\\/g, '/');
      if (normalizedId.startsWith(componentsSrc)) {
        const fileDir = dirname(id);
        return code.replace(
          /(['"])(@\/([^'"]+))\1/g,
          (_match, quote, _original, importPath) => {
            const absolutePath = resolve(componentsSrc, importPath);
            const relativePath = relative(fileDir, absolutePath).replace(
              /\\/g,
              '/',
            );
            const finalPath = relativePath.startsWith('.')
              ? relativePath
              : './' + relativePath;
            return `${quote}${finalPath}${quote}`;
          },
        );
      }
      return null;
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  if (isDev) {
    // 开发模式：将组件库解析到源码入口，实现 HMR
    return {
      plugins: [vue(), resolveComponentsSource()],
      resolve: {
        alias: [
          // docs 项目内部的 @/ 别名
          { find: '@', replacement: resolve(__dirname, 'src') },
          // 将 qyani-components 解析到源码，支持 HMR
          {
            find: /^qyani-components$/,
            replacement: resolve(__dirname, '../components/src/index.ts'),
          },
        ],
      },
      server: {
        fs: {
          allow: [resolve(__dirname, '..')],
        },
      },
      optimizeDeps: {
        exclude: ['qyani-components'],
      },
    };
  }

  // 生产构建：使用预构建的组件库产物（dist/）
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
});
