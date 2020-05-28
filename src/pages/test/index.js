import React, { useEffect } from 'react';

function trampoline(f) {
  return function trampolined(...args) {
    let result = f.bind(null, ...args);

    while (typeof result === 'function') result = result();

    return result;
  };
}

function test() {
  const entry = {
    'a.d.gg': 'what',
    'a.b.c.zz': 'some',
    'a.e': 'zzzz',
    'e.f': 'sss',
  };
  let output = {};

  Object.entries(entry).forEach(([one, two]) => {
    const tempArr = one.split('.');
    const endArr = new Array(tempArr.length).fill('}').join('');
    const total = `{"${tempArr.join('":{"')}":"${two}"${endArr}`;
    output = deepObjectMerge(output, JSON.parse(total));
  });

  function deepObjectMerge(FirstOBJ, SecondOBJ) {
    for (const key in SecondOBJ) {
      FirstOBJ[key] =
        FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]'
          ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key])
          : (FirstOBJ[key] = SecondOBJ[key]);
    }
    return FirstOBJ;
  }

  return output;
}

export default () => {
  useEffect(() => {
    const factorial = trampoline(function _factorial(n, acc = 1) {
      if (n <= 1) return acc;
      return () => _factorial(n - 1, n * acc);
    });

    console.log(test());

    // console.log(factorial(5));
  }, []);
  return <div>123</div>;
};
