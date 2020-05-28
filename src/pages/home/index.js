import React, { useEffect, useRef, useState, useMemo } from 'react';
import Line from './components/Line';
import Text from './components/Text';
import Shape from './components/Shape';
import Map from './components/Map';
import Cube from './components/Cube';
import Point from './components/Point';
import Cylinder from './components/Cylinder';
import useDebounce from '@/common/hooks/useDebounce';
import styles from './index.less';

//  home
const Test = () => {
  const [chartPool, setChartPool] = useState([]);

  const lineContainer = useRef(null);
  const textContanier = useRef(null);
  const mapContanier = useRef(null);
  const shapeContanier = useRef(null);
  const cubeContanier = useRef(null);
  const pointContanier = useRef(null);
  const cylinderContanier = useRef(null);

  const lineChart = useRef(null);
  const textChart = useRef(null);
  const mapChart = useRef(null);
  const shapeChart = useRef(null);
  const cubeChart = useRef(null);
  const pointChart = useRef(null);
  const cylinderChart = useRef(null);

  const [size, setSize] = useState({ width: 200, height: 200 });
  const [text, setText] = useState('孟少华');

  const handleChangeSize = () => {
    const n = Math.ceil(Math.random() * (200 - 100) + 100);
    setSize({ width: n, height: n });
  };

  const handleText = t => {
    setText(t.target.value);
  };

  const handleStopRender = () => {
    chartPool.forEach(t => {
      t.current && t.current.stopRender();
    });
  };

  const handleStartRender = () => {
    chartPool.forEach(t => {
      t.current && t.current.animate();
    });
  };

  const handleResize = () => {
    chartPool.forEach(t => {
      t.current && t.current.resize(size.width, size.height);
    });
  };

  const [debounceCancel] = useDebounce(
    () => {
      if (textChart.current) textChart.current.text = text;
    },
    500,
    false,
    [text],
  );

  useEffect(() => {
    if (!lineChart.current) lineChart.current = new Line({ ...size });
    lineContainer.current.appendChild(lineChart.current.domElement);

    if (!textChart.current) textChart.current = new Text({ ...size });
    textChart.current.text = text;
    textContanier.current.appendChild(textChart.current.domElement);

    if (!mapChart.current) mapChart.current = new Map({ ...size });
    mapContanier.current.appendChild(mapChart.current.domElement);

    if (!shapeChart.current) shapeChart.current = new Shape({ ...size });
    shapeContanier.current.appendChild(shapeChart.current.domElement);

    if (!cubeChart.current) cubeChart.current = new Cube({ ...size });
    cubeContanier.current.appendChild(cubeChart.current.domElement);

    if (!pointChart.current) pointChart.current = new Point({ ...size });
    pointContanier.current.appendChild(pointChart.current.domElement);

    if (!cylinderChart.current)
      cylinderChart.current = new Cylinder({
        ...size,
      });
    cylinderContanier.current.appendChild(cylinderChart.current.domElement);
  }, []);

  useEffect(() => {
    setChartPool([
      lineChart,
      textChart,
      mapChart,
      shapeChart,
      cubeChart,
      pointChart,
      cylinderChart,
    ]);

    handleStartRender();

    return () => {
      handleStopRender();
      debounceCancel();
    };
  }, [
    lineChart.current,
    textChart.current,
    mapChart.current,
    shapeChart.current,
    cubeChart.current,
    pointChart.current,
    cylinderChart.current,
  ]);

  useEffect(() => {
    handleResize();
  }, [size.width, size.height]);

  return (
    <>
      <div className={styles.dis}>
        <p>宽: {size.width} px</p>
        <p>高: {size.height} px</p>
      </div>
      <div className={styles.dis}>
        <button onClick={handleChangeSize}>ChangeSize</button>
        <button onClick={handleStopRender}>StopRender</button>
        <button onClick={handleStartRender}>StartRender</button>
        <input onChange={handleText} />
      </div>
      <div className={styles.dis}>
        {useMemo(
          () => (
            <div ref={lineContainer} style={{ ...size }} />
          ),
          [lineChart.current],
        )}
        {useMemo(
          () => (
            <div ref={textContanier} style={{ ...size }} />
          ),
          [textChart.current],
        )}
        {useMemo(
          () => (
            <div ref={mapContanier} style={{ ...size }} />
          ),
          [mapChart.current],
        )}
        {useMemo(
          () => (
            <div ref={shapeContanier} style={{ ...size }} />
          ),
          [shapeChart.current],
        )}
        {useMemo(
          () => (
            <div ref={cubeContanier} style={{ ...size }} />
          ),
          [cubeChart.current],
        )}
        {useMemo(
          () => (
            <div ref={pointContanier} style={{ ...size }} />
          ),
          [pointChart.current],
        )}
        {useMemo(
          () => (
            <div ref={cylinderContanier} style={{ ...size }} />
          ),
          [cylinderChart.current],
        )}
      </div>
      <br />
      <br />
    </>
  );
};

export default Test;
