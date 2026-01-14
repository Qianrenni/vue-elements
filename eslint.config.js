// eslint.config.js
import eslintJs from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
export default [
  // 忽略文件（必须是独立对象，不含其他字段）
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'public/**',
      '*.d.ts',
      '.vscode/**',
      '.git/**',
    ],
  },

  // 基础 JS 规则（@eslint/js 导出的是单个对象或数组）
  eslintJs.configs.recommended,

  // Vue 规则（eslint-plugin-vue 的 flat/recommended 是一个数组）
  // 直接放入，不要展开！
  ...vuePlugin.configs['flat/recommended'],

  // TypeScript + Vue 支持
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  // Vue 文件支持
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        parser: tsParser,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
]
