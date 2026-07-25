import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      '**/.vscode/**',
      '**/*.lock',
      '**/pnpm-lock.yaml',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  tseslint.configs.recommended,
  {
    // Vue SFC 内嵌字符串中的 <\/script> 转义是必需的（否则 SFC 解析器会提前结束 script 块），
    // js/recommended 的 no-useless-escape 对 .vue 误报，这里关闭它。
    files: ['**/*.vue'],
    rules: {
      'no-useless-escape': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    ...pluginVue.configs['flat/essential'][0],
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
  {
    files: ['**/*.json'],
    ignores: ['**/tsconfig*.json', '**/jsconfig*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.jsonc'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended'],
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: ['css/recommended'],
    rules: {
      // 组件库样式有意使用 !important 覆盖使用者样式，且大量引用自定义 CSS 变量，
      // css/recommended 的这两条规则在此场景下误报，关闭它们。
      'css/no-important': 'off',
      'css/no-invalid-properties': 'off',
      'css/no-empty-blocks': 'off',
      'css/font-family-fallbacks': 'off',
    },
  },
]);

