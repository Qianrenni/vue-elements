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
