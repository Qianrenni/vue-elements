import os
import re

prefix_content = """
import "./style/common.css";
export * from "./events";
export * from "./utils";
export * from "./types"
"""
dir_path = r'F:\eclipse\worakjava\qyani-components\src\components'
out_path = r'F:\eclipse\worakjava\qyani-components\src\index.ts'
result = []
install_list = []
components = []
pattern = re.compile(r'[/\\]src(.*)[/\\](.*)\.vue')
for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.vue'):
            file_name = os.path.splitext(file)[0]
            import_dir = pattern.search(os.path.join(root, file)).group(1).replace('\\', '/')
            result.append(f"import {{default as Q{file_name}}} from '.{import_dir}/{file}';")
            install_list.append(f"app.component('Q{file_name}',Q{file_name});")
            components.append(f"Q{file_name}")
prefix_content += '\n'.join(result)
sep = '\n\t\t'
prefix_content += f"""
export default {{
    install(app: any) {{
    {sep.join(install_list)}
    }},
}};
"""
sep = ',\n\t\t'
prefix_content += f"""
export {{
        {sep.join(components)}
}}
"""
with open(out_path, 'w', encoding='utf-8') as f:
    f.write(prefix_content)
