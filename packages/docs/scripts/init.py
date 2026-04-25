
from pathlib import Path
import os
import shutil 
def filter_file(file_path, ignore_fields=None):
    if ignore_fields is None:
        ignore_fields = ['Sql', 'types', 'style', 'scripts', 'index', 'DemoBlock','main']
    if any(field in file_path for field in ignore_fields):
        return True
def filter_dir(dir_path):
    return any(field in dir_path for field in ['types', 'style', 'scripts', 'index', 'DemoBlock'])

def main():
    target_display_path = Path(__file__).parent.parent / 'src' / 'display'
    target_docs_path = Path(__file__).parent.parent / 'public' / 'docs'
    src_vue_path = Path(__file__).parent.parent.parent/'components'/'src'
    # 删除文件夹
    shutil.rmtree(target_display_path)
    shutil.rmtree(target_docs_path)
    def _helper(dir_path:Path):
        for sub_dir in dir_path.iterdir():
            if sub_dir.is_dir() and not filter_dir(str(sub_dir)):
                _helper(sub_dir)
            elif not filter_file(str(sub_dir)):
                md_file = Path(str(sub_dir).replace(str(src_vue_path),str(target_docs_path)).replace('.ts','.md').replace('.vue','.md'))
                md_file.parent.mkdir(parents=True, exist_ok=True)
                md_file.touch(exist_ok=True)
                print(f'Created md file: {md_file}')
                vue_file = Path(str(sub_dir).replace(str(src_vue_path),str(target_display_path)).replace('.ts','.vue'))
                vue_file.parent.mkdir(parents=True, exist_ok=True)
                vue_file.touch(exist_ok=True)
                print(f'Created vue file: {vue_file}')
    
    _helper(src_vue_path)
if __name__ == '__main__':
    main()
