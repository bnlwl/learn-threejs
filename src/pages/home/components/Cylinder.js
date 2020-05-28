import * as THREE from 'three';
import ThreeBase from '@/common/chart/ThreeBase';

class Cylinder extends ThreeBase {
  constructor(props) {
    super(props);
    this.mapTexture = new THREE.TextureLoader().load('./image/yutu.jpg');

    this.init();
    this.initCamera();
  }

  initCamera() {
    this.camera.target = new THREE.Vector3(0, 0, 0);
  }

  init() {
    var geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    var material = new THREE.MeshBasicMaterial({
      map: this.mapTexture,
    });
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.geometry.scale(-1, 1, 1);
    this.scene.add(cylinder);
  }
}

export default Cylinder;
