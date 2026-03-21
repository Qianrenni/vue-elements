# -*- coding: utf-8 -*-
import  os
from pathlib import Path
root_dir = Path(__file__).parent.parent
input_dir_path = root_dir / 'src' / 'components'
output_path = root_dir / 'global.d.ts'

result = []
for root, dirs, files in os.walk(input_dir_path):
    for file in files:
        if 'index' in file:
            continue
        file_without_extension = file.split('.')[0]
        result.append(f'Q{file_without_extension}')
declare_result = [f'{i}: typeof {i}' for i in result]
prefix = f"""
import type {{
    {',\n\t'.join(result)}
}} from './dist/types/index';
import type {{ Plugin }} from 'vue'

declare module 'vue' {{
    export interface GlobalComponents {{
        {'\n\t\t'.join(declare_result)}
    }}
}}
declare const QyaniComponents: Plugin
export default QyaniComponents
"""
output_path.write_text(prefix, encoding='utf-8')
