import  os
from pathlib import Path
root_dir = Path(__file__).parent.parent
src_dir = root_dir / 'public'/'assets'/'svg'
ans=[]
for f in os.listdir(src_dir):
    if f.endswith('.svg'):
        ans.append(f'{f.split('.')[0]}')
print(ans)
