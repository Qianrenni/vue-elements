import os
import re

dir_path = r'F:\eclipse\worakjava\qyani-components\src\components'
result = []
install_list = []
components = []
pattern = re.compile(r'[/\\]src(.*)[/\\](.*)\.vue')
for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.vue'):
            file_name = os.path.splitext(file)[0]
            import_dir = pattern.search(os.path.join(root, file)).group(1).replace('\\', '/')
            result.append(f"import {{default as Q{file_name}}} from '.{import_dir}/{file}'")
            install_list.append(f"app.component('Q{file_name}',Q{file_name})")
            components.append(f"Q{file_name}")
print('\n'.join(result))
print('\n'.join(install_list))
print(',\n'.join(components))
