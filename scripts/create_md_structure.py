import os

def mk_file(path):
    if not os.path.exists(path):
        with open(path, 'w') as f:
            f.write('')
def mk_dir(path):
    if not os.path.exists(path):
        os.mkdir(path)

dir_path = r'F:\eclipse\worakjava\qyani-components\src'
if 'src' not in dir_path:
    raise Exception('请输入正确的路径')
display_path = dir_path.replace('src', 'src/display')
if not os.path.exists(display_path):
    os.mkdir(display_path)
for root, dirs, files in os.walk(dir_path):
    for dir in dirs:
        if 'src/diplay' in dir:
            continue
        full_dir_path = os.path.join(root, dir)
        md_dir_path = full_dir_path.replace('src', 'src/display')
        mk_dir(md_dir_path)
    for file in files:
        if 'src/display' in file:
            continue
        full_file_path = os.path.join(root, file)
        md_file_path = full_file_path.replace('src', 'src/display').split('.')[0] + '.vue'
        mk_file(md_file_path)

docs_path = dir_path.replace('src', 'docs')
if not os.path.exists(docs_path):
    os.mkdir(docs_path)
for root, dirs, files in os.walk(dir_path):
    for dir in dirs:
        full_dir_path = os.path.join(root, dir)
        md_dir_path = full_dir_path.replace('src', 'docs')
        mk_dir(md_dir_path)
    for file in files:
        full_file_path = os.path.join(root, file)
        md_file_path = full_file_path.replace('src', 'docs').split('.')[0] + '.md'
        mk_file(md_file_path)


