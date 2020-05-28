import * as THREE from 'three';
import ThreeBase from '@/common/chart/ThreeBase';

class Point extends ThreeBase {
  constructor(props) {
    super(props);
    this.init();
    this.initCtrl();
  }

  init() {
    const path = './image/';
    const format = '.jpg';
    const urls = [
      path + 'px' + format,
      path + 'nx' + format,
      path + 'py' + format,
      path + 'ny' + format,
      path + 'pz' + format,
      path + 'nz' + format,
    ];

    const reflectionCube = new THREE.CubeTextureLoader().load(urls);

    this.scene.background = reflectionCube;
  }

  initCtrl() {
    this.controls.autoRotate = true;
  }
}

export default Point;
