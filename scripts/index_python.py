import os
import re
from pathlib import Path
root_dir = Path(__file__).parent.parent
target_dir = root_dir / 'src' / 'components'
out_path = root_dir / 'src' / 'index.ts'
prefix_content = """
import "./style/common.css";
import "./style/private.css";
export * from "./events";
export * from "./utils";
export * from "./types"
"""
result = []
install_list = []
components = []
pattern = re.compile(r'[/\\]src(.*)[/\\](.*)\.vue')
for root, dirs, files in os.walk(target_dir):
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
out_path.write_text(prefix_content, encoding='utf-8')
