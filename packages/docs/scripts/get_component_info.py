import json
import os
from pathlib import Path

src_dir = Path(__file__).parent.parent / 'src' / 'display'
out_file = Path(__file__).parent.parent / 'src' / 'utils' / 'useComponentInfo.ts'

result = []

for root, _dirs, files in os.walk(src_dir):
    for file in files:
        if not file.endswith('.vue'):
            continue

        full_path = os.path.join(root, file)
        file_name = os.path.splitext(file)[0]
        category = full_path.replace(str(src_dir), '').replace(file, '').replace('\\', '/')
        doc_path = full_path.replace(str(src_dir), '').replace('.vue', '.md').replace('\\', '/')
        doc_path = f'/docs{doc_path}'

        result.append({
            'name': file_name,
            'displayName': file_name,
            'category': category,
            'docPath': doc_path,
        })

# Sort for deterministic output
result.sort(key=lambda x: x['name'])

prefix = """export interface ComponentInfo {
    category: string,
    name: string,
    displayName: string,
    docPath: string,
}
export const useComponentInfo: ComponentInfo[] = """

with open(out_file, 'w', encoding='utf-8') as f:
    f.write(prefix + json.dumps(result, indent=4))

print(f'Generated {out_file} with {len(result)} entries.')
