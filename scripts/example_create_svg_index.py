import  os

path = r'D:/webstorm/workdir/qyani-elements/src/icons'
ans=[]
for f in os.listdir(path):
    ans.append(f'\'{f.split('.')[0]}\'')
print(' | '.join(ans))
