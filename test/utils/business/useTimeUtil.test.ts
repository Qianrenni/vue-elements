import { UseTimeUtils } from '@/utils';
import { describe,expect,it} from 'vitest';
describe(
    'useTimeUtils',
    () => {
        it('时间相同应该相等',()=>{
            const date1 = new UseTimeUtils('2023-01-01');
            const date2 = new UseTimeUtils('2023-01-01');
            const date3 = new UseTimeUtils('2023-01-02');
            expect(date1.equals(date2)).toBe(true)
            expect(date1.equals(date3)).toBe(false)
            expect(date2.equals(date3)).toBe(false)
        })
        it('能够分清闰年',()=>{
            const start = new UseTimeUtils('2016-01-01');
            const end = new UseTimeUtils('2017-01-01');
            let count = 0;
            while(!start.equals(end)){
                count+=1;
                start.add(1,'day');
            }
            expect(count).toBe(366)
        })
        it('能够分清平年',()=>{
            const start = new UseTimeUtils('2017-01-01');
            const end = new UseTimeUtils('2018-01-01');
            let count = 0;
            while(!start.equals(end)){
                count+=1;
                start.add(1,'day');
            }
            expect(count).toBe(365)
        })
    }
)