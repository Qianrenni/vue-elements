// 定义一个安全调用函数
export function letIfNotNull<T,R>(value:T|null|undefined, fn:(_:T)=>R):R | undefined {
  if (value != null) { // 注意：!= null 会同时排除 null 和 undefined
    return fn(value);
  }
  return undefined; // 或者返回 value 本身，根据需求
}