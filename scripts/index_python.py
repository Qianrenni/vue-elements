import os
dir_path=r'../src/components'
result=[]
install_list=[]
components=[]
for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.vue'):
            file_name = os.path.splitext(file)[0]
            result.append(f"import {{default as Q{file_name}}} from './components/{file}'")
            install_list.append(f"app.component('Q{file_name}',Q{file_name})")
            components.append(f"Q{file_name}")
print('\n'.join( result))
print('\n'.join( install_list))
print(',\n'.join( components))