// src/components/index.ts

// 自动导入所有 .vue 文件
const components = import.meta.glob('./**/*.vue', {eager: true})

// 提取默认导出并按文件名注册
const componentExports = {}

for (const path in components) {
    const componentName = path
        .replace(/^\.\/(.*)\.vue$/, '$1')           // 去掉 ./ 和 .vue
        .split('/')                                 // 分割路径
        .map(p => p.charAt(0).toUpperCase() + p.slice(1)) // 首字母大写
        .join('')                                   // 合并

    componentExports[componentName] = components[path].default
}

export default componentExports