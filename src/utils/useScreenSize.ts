import {ref,type Ref} from 'vue'
import { useWindowResize } from './useWindowResize';
const hashMap=new Map<string,Ref<boolean>>();
/**
 * 屏幕尺寸响应式变量获取
 */
export const useScreenSize = {
    getWidth(width:number):Ref<boolean>{
        const key = `width-${width}`
        if (hashMap.has(key)) {
            return hashMap.get(key)!;
        }
        const refWidth = ref(window.innerWidth<=width);
        useWindowResize.addHandler((innerWidth,_)=>{
            refWidth.value=innerWidth<=width
        });
        hashMap.set(key, refWidth);
        return refWidth;
    }
    ,
    getHeight(height:number):Ref<boolean>{
        const key = `height-${height}`
        if (hashMap.has(key)) {
            return hashMap.get(key)!;
        }
        const refHeight = ref(window.innerHeight<=height);
        useWindowResize.addHandler((_,innerHeight)=>{
            refHeight.value=innerHeight<=height
        });
        hashMap.set(key, refHeight);
        return refHeight;
    }
}