import * as THREE from 'three';
import ThreeBase from '@/common/chart/ThreeBase';

class Line extends ThreeBase {
  constructor(props) {
    super(props);
    this._line = null;
    this.initLine();
    this.ctrlCamera();

    this.controls.autoRotate = true;
  }

  ctrlCamera() {
    this._camera.position.set(0, 0, 20);
  }

  animateContent() {}

  initLine() {
    const meraticl = new THREE.LineBasicMaterial({
      color: 0xff00ee,
    });
    const points = [
      new THREE.Vector3(-10, 0, 0),
      new THREE.Vector3(0, 10, 0),
      new THREE.Vector3(10, 0, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, meraticl);

    this._scene.add(line);

    this._line = line;
  }
}

export default Line;
