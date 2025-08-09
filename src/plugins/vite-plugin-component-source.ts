// vite-plugins/component-source.ts
import {readFileSync} from 'fs'
import {join, normalize} from 'path'

export function vitePluginComponentSource() {
    return {
        name: 'vite-plugin-component-source',
        configureServer(server) {
            server.middlewares.use('/__source__', (req, res, next) => {
                // ✅ 1. 检查 query 是否存在
                if (!req.url || !req.url.includes('?')) {
                    res.writeHead(400, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({error: 'Missing query parameters. Use ?path=...'}))
                    return
                }

                // ✅ 2. 手动解析 query（避免依赖第三方库）
                const url = new URL(req.url, `http://${req.headers.host}`)
                const filePath = url.searchParams.get('path')

                // ✅ 3. 检查 path 是否存在
                if (!filePath) {
                    res.writeHead(400, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({error: 'Missing required query parameter: path'}))
                    return
                }

                // ✅ 4. 安全校验：必须是 /src/components/ 下的 .vue 文件
                if (!filePath.startsWith('/src/components/') || !filePath.endsWith('.vue')) {
                    res.writeHead(400, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({error: 'Invalid path. Must be a .vue file under /src/components/'}))
                    return
                }

                try {
                    // ✅ 5. 转为绝对路径
                    const root = process.cwd()
                    const fullPath = normalize(join(root, filePath))

                    // ✅ 6. 读取文件
                    const content = readFileSync(fullPath, 'utf-8')

                    res.writeHead(200, {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Access-Control-Allow-Origin': '*' // 开发环境允许
                    })
                    res.end(JSON.stringify({content}))
                } catch (e: any) {
                    console.warn(`[vite-plugin-component-source] 读取文件失败: ${filePath}`, e.message)
                    res.writeHead(404, {'Content-Type': 'application/json'})
                    res.end(JSON.stringify({error: 'File not found or permission denied'}))
                }
            })
        }
    }
}