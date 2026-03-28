import { UseTimeUtils } from '@/utils';
import { describe,expect,it} from 'vitest';
describe(
    'useTimeUtils',
    () => {
        it('时间相同应该相等',()=>{
            const date1 = new UseTimeUtils('2023-01-01');
            const date2 = new UseTimeUtils('2023-01-01');
            expect(date1.equals(date2)).toBe(true)
        })
    }
)