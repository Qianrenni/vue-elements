/**
 * 二分查找,从左到右返回最小索引,如果找不到则返回-1
 * @param array 数组
 * @param target 目标值
 * @param func
 *  - return 0 则表示相等
 *  - return <0 则表示小于目标值
 *  - return >0 则表示大于目标值
 * @returns 找到则返回索引,否则返回-1
 */
export function binarySearchLeft<T>(array:T[], target:T,func:(a:T,b:T)=>number) {
    let left = 0, right = array.length - 1;
    let ans = -1;
    while(left<=right){
        let mid = Math.floor((left + right) / 2);
        const compare = func(array[mid]!,target);
        if(compare<0){
            left = mid + 1;
        }else if(compare>0){
            right = mid - 1;
        }else{
            ans = mid;
            right = mid - 1;
        }
    }
    return ans;
}
/**
 * 二分查找,从右到左返回最大索引,如果找不到则返回-1
 * @param array 数组
 * @param target 目标值
 * @param func
 *  - return 0 则表示相等
 *  - return <0 则表示小于目标值
 *  - return >0 则表示大于目标值
 * @returns 找到则返回索引,否则返回-1
 */
export function binarySearchRight<T>(array:T[], target:T,func:(a:T,b:T)=>number) {
    let left = 0, right = array.length - 1;
    let ans = -1;
    while(left<=right){
        let mid = Math.floor((left + right) / 2);
        const compare = func(array[mid]!,target);
        if(compare<0){
            left = mid + 1;
        }else if(compare>0){
            right = mid - 1;
        }else{
            ans = mid;
            left = mid + 1;
        }
    }
    return ans;
}