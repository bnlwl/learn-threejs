import { useState, useEffect } from 'react';
export default ({ width = 100, height = 100 }) => {
  const [size, setSize] = useState({
    width,
    height,
  });

  const resize = () => {};

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return [
    size,
    ({ width = size.width, height = size.height }) => {
      setSize({
        width,
        height,
      });
    },
  ];
};
