import json
import os
from pathlib import Path
src_dir = str(Path(__file__).parent.parent / 'src' / 'display')
out_file = str(Path(__file__).parent.parent / 'src' / 'utils' / 'useComponentInfo.ts')
result = []
prefixFileContent ="""
export interface ComponentInfo{
    category:string,
    name:string,
    displayName:string,
    docPath:string,
}
export const useComponentInfo:ComponentInfo[] = """
for root, dirs, files in os.walk(src_dir):
    for file in files:
        full_path = os.path.join(root, file)
        fileName = file.split('.')[0]
        category = full_path.replace(src_dir, '').replace(file, '').replace('\\', '/')
        docPath = full_path.replace(src_dir, '').replace('.vue','.md').replace('.ts','.md').replace('\\', '/')
        docPath = f'/docs{docPath}'
        result.append({
            "name": fileName,
            "displayName": fileName,
            "category": category,
            "docPath": docPath,
        })
with open(out_file, 'w', encoding='utf-8') as f:
    suffix= json.dumps(result,indent=4)
    f.write(prefixFileContent+suffix)