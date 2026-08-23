// 发布前校验脚本（prepublishOnly）：
// 确保发布产物中的 workspace: 协议已被 pnpm 改写为真实版本号。
//
// 背景：qyani-components 依赖 "@qianrenni/core": "workspace:^"。
// workspace: 协议只有在通过 pnpm pack / pnpm publish 打包时才会被自动改写为
// 真实版本（如 ^1.0.0）。若用 npm publish 等非 pnpm 方式发布，产物会残留
// workspace:^，导致消费者安装报错 "Unsupported URL Type 'workspace:'"。
//
// 本脚本做两件事：
//   1. 校验当前发布工具必须是 pnpm（否则直接中止）。
//   2. 用 pnpm pack 实际生成 tarball，检查产物 package.json 无 workspace: 残留。
import { execSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const npmExecPath = process.env.npm_execpath || '';
const userAgent = process.env.npm_config_user_agent || '';
const isPnpm =
  npmExecPath.toLowerCase().includes('pnpm') || /(^|\s)pnpm\//.test(userAgent);

const errors = [];
const fail = (msg) => errors.push(msg);

if (!isPnpm) {
  fail(
    `检测到发布工具不是 pnpm（npm_execpath="${npmExecPath}"，` +
      `npm_config_user_agent="${userAgent}"）。`,
  );
  fail(
    'workspace: 协议只有通过 pnpm pack / pnpm publish 才会被改写为真实版本号。',
  );
  fail('请使用 pnpm publish 发布（或在仓库根目录执行 pnpm run release）。');
} else {
  // 用 pnpm pack 实际生成 tarball，检查产物中的 package.json
  const tmp = mkdtempSync(join(tmpdir(), 'qyani-check-'));
  try {
    try {
      execSync('pnpm pack --pack-destination "' + tmp + '"', {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      });
    } catch (err) {
      fail('pnpm pack 失败：' + (err.stderr?.toString() || err.message));
    }

    const tarball = readdirSync(tmp).find((f) => f.endsWith('.tgz'));
    if (tarball) {
      execSync(`tar -xzf "${join(tmp, tarball)}" -C "${tmp}"`, {
        stdio: 'ignore',
      });
      const pkg = JSON.parse(
        readFileSync(join(tmp, 'package', 'package.json'), 'utf8'),
      );
      for (const section of [
        'dependencies',
        'devDependencies',
        'peerDependencies',
      ]) {
        for (const [name, spec] of Object.entries(pkg[section] || {})) {
          if (String(spec).startsWith('workspace:')) {
            fail(
              `发布产物 ${section}.${name} 仍为 "${spec}"（workspace: 协议残留），` +
                '消费者将无法安装！',
            );
          }
        }
      }
      if (!errors.length) {
        console.log('✅ 发布产物检查通过：workspace: 协议已改写为真实版本号');
      }
    }
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

if (errors.length) {
  console.error('\n❌ 发布前检查未通过：');
  for (const e of errors) console.error('  - ' + e);
  console.error('\n已中止发布。请使用 pnpm publish 发布。');
  process.exit(1);
}
