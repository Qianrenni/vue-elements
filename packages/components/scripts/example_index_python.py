import os
import re
from pathlib import Path
from collections import defaultdict

root_dir = Path(__file__).parent.parent
target_dir = root_dir / 'src' / 'components'
out_path = root_dir / 'src' / 'index.ts'

static_prefix = """import "./style/common.css";
import "./style/private.css";
export * from "./events";
export * from "./utils";
export * from "./types"
"""

# Collect components grouped by their parent directory
dir_components: dict[str, list[str]] = defaultdict(list)
pattern = re.compile(r'[/\\]src(.*)[/\\](.*)\.vue')

for root, _dirs, files in os.walk(target_dir):
    for file in files:
        if file.endswith('.vue'):
            file_name = os.path.splitext(file)[0]
            match = pattern.search(os.path.join(root, file))
            if match:
                # e.g., /components/basic/Icon/Icon.vue -> group(1) = /components/basic/Icon
                import_dir = match.group(1).replace('\\', '/')
                dir_components[import_dir].append(file_name)

# Generate import statements (grouped by directory, sorted for determinism)
import_lines: list[str] = []
for import_dir in sorted(dir_components):
    names = sorted(dir_components[import_dir])
    q_names = [f"Q{name}" for name in names]
    if len(q_names) == 1:
        import_lines.append(f"import {{ {q_names[0]} }} from '.{import_dir}';")
    else:
        sep = ',\n  '
        import_lines.append(
            f"import {{\n  {sep.join(q_names)},\n}} from '.{import_dir}';"
        )

# Generate install registrations (app.component calls)
install_list: list[str] = []
for import_dir in sorted(dir_components):
    for name in sorted(dir_components[import_dir]):
        install_list.append(f"app.component('Q{name}', Q{name});")

# Generate export * lines for each component directory
export_lines: list[str] = []
for import_dir in sorted(dir_components):
    export_lines.append(f"export * from '.{import_dir}';")

# Assemble the final content
result = static_prefix
result += '\n'.join(import_lines)
result += '\n\n'
result += '\n'.join(export_lines)
result += '\n'

install_body = '\n    '.join(install_list)
result += f"""
export default {{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    install(app: any) {{
    {install_body}
    }},
}};
"""

out_path.write_text(result, encoding='utf-8')
print(f"Generated {out_path} successfully.")
