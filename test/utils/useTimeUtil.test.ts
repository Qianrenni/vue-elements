import { UseTimeUtils } from '@/utils';
import { describe,it} from 'vitest';
describe(
    'useTimeUtils',
    () => {
        it('返回正确的格式化时间',()=>{
            const date = new UseTimeUtils();
            console.log(date.format())
        })
    }
)