import os


dir_path = r'D:\webstorm\workdir\qyani-elements\src'
md_path = dir_path.replace('src', 'docs')
if not os.path.exists(md_path):
    os.mkdir(md_path)
for root, dirs, files in os.walk(dir_path):
    for dir in dirs:
        full_dir_path = os.path.join(root, dir)
        md_dir_path = full_dir_path.replace('src', 'md')
        if not os.path.exists(md_dir_path):
            os.mkdir(md_dir_path)
    for file in files:
        full_file_path = os.path.join(root, file)
        md_file_path = full_file_path.replace('src', 'md').split('.')[0] + '.md'
        if not os.path.exists(md_file_path):
            #  新建文件
            with open(md_file_path, 'w') as f:
                f.write('')




