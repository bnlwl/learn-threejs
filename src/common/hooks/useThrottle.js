import { useState, useRef, useEffect } from 'react';

export default (func, wait = 300, deps = []) => {
  let prev = useRef(0);
  let [waitTime, setWaitTime] = useState(wait);

  useEffect(() => {
    const now = Date.now();
    if (now - prev.current > waitTime) {
      func();
      previous.current = now;
    }
  }, deps);

  const cancel = () => {
    setWaitTime(0);
  };

  return [cancel];
};
