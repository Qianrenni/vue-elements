import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const data = JSON.parse(
  readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'index.json'),
    'utf-8',
  ),
);

const names = data.entries.map((e) => e.name);
console.log('total:', data.entries.length);
console.log('QBreathing:', names.includes('QBreathing'));
console.log('QSkeleton:', names.includes('QSkeleton'));
console.log('QSpinner:', names.includes('QSpinner'));
console.log('style tokens/color:', names.includes('tokens/color'));
console.log('style utilities/spacing:', names.includes('utilities/spacing'));
console.log('counts:', JSON.stringify(data.meta.counts));

const styleColor = data.entries.find((e) => e.name === 'tokens/color');
if (styleColor) {
  console.log(
    'style tokens/color vars:',
    styleColor.style.variables.length,
    'classes:',
    styleColor.style.classes.length,
    'deprecated:',
    styleColor.style.deprecated
      ? `${styleColor.style.deprecated.variables.length} vars`
      : 'none',
  );
}

// 废弃（兼容保留）样式解析验证
const depChecks = [
  // [条目, 期望在 旧变量/旧类名/旧关键帧 中出现的名称]
  // 注意：变量带 -- 前缀存储，类名不带 . 前缀
  ['tokens/color', ['--primary-color', '--text-color', '--background-color']],
  ['tokens/spacing', ['--distance', '--half-distance', '--third-distance']],
  ['tokens/elevation', ['--z-index-level-1', '--z-index-level-2']],
  ['tokens/motion', ['rotate', 'dash', 'pulse', 'up-down']],
  [
    'utilities/spacing',
    ['margin-rem', 'margin-auto', 'padding-rem', 'padding-24rem'],
  ],
  ['utilities/layout', ['container', 'inner-container', 'gap', 'gap-half']],
  ['utilities/display', ['radius-rem', 'radius-half-rem', 'shadow-common']],
  ['utilities/typography', ['text-2rem', 'text-08rem', 'text-05rem']],
];
for (const [name, expected] of depChecks) {
  const e = data.entries.find((x) => x.name === name);
  const d = e?.style?.deprecated;
  const found = new Set([
    ...(d?.variables ?? []),
    ...(d?.classes ?? []),
    ...(d?.keyframes ?? []),
  ]);
  const missing = expected.filter((x) => !found.has(x));
  const status = d
    ? `vars=${d.variables.length} classes=${d.classes.length} keyframes=${d.keyframes.length}`
    : 'NONE';
  console.log(
    `deprecated ${name}: ${status}`,
    missing.length ? `  MISSING: ${missing.join(', ')}` : '  ok',
  );
}

for (const name of [
  'QIcon',
  'QDialog',
  'QBreathing',
  'useObject',
  'useHeap',
  'useDrag',
]) {
  const e = data.entries.find((x) => x.name === name);
  if (!e) {
    console.log(`--- ${name}: NOT FOUND`);
    continue;
  }
  console.log(`--- ${name} [${e.package}/${e.type}/${e.category}]`);
  console.log('   desc:', e.description);
  if (e.api) {
    console.log(
      '   props:',
      e.api.props.length,
      'emits:',
      e.api.emits.length,
      'slots:',
      e.api.slots.length,
    );
    if (e.api.props[0])
      console.log('   prop[0]:', JSON.stringify(e.api.props[0]));
    if (e.api.emits[0])
      console.log('   emit[0]:', JSON.stringify(e.api.emits[0]));
  }
  if (e.functions)
    console.log('   fns:', e.functions.map((f) => f.name).join(', '));
  const src = data.sources[name];
  console.log('   sources:', src ? Object.keys(src).join(', ') : 'none');
}
