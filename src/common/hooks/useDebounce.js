import { useEffect, useRef } from 'react';

/**
 * @description 防抖函数
 * @param func 执行函数
 * @param wait 等待时间
 * @param deps 依赖项
 * @param immediate 是否立即执行
 * @return cancel api
 */

export default (func, wait = 300, immediate = false, deps = []) => {
  let timer = useRef(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    if (immediate) {
      const callNow = !timer.current;
      timer.current = setTimeout(() => {
        timer.current = null;
      }, wait);
      if (callNow) func();
    } else {
      timer.current = setTimeout(() => {
        func();
      }, wait);
    }
  }, deps);

  const cancel = () => {
    clearTimeout(timer.current);
    timer = null;
  };

  return [cancel];
};
