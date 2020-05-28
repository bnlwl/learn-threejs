import * as THREE from 'three';
import ThreeBase from '@/common/chart/ThreeBase';
import fontJson from 'three/examples/fonts/gentilis_regular.typeface.json';
import chineseFont from '../c.json';

class Text extends ThreeBase {
  constructor(props) {
    super(props);
    this.theta = 0;
    this.radius = 100;
    this._text = 'Hello';
    this.init();
    this.ctrlCamera();

    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 15;
  }

  ctrlCamera() {
    this.camera.position.set(0, 0, 80);
  }

  set text(text) {
    if (!text) return;
    this._text = text;
    this.deleteObject3D('text_mesh');
    this.init();
  }

  init() {
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      size: THREE.DoubleSide,
    });
    const loader = new THREE.FontLoader();
    const gentilis = loader.parse(chineseFont);

    const geometry = new THREE.TextGeometry(this._text, {
      font: gentilis,
      size: 12,
      height: 3,
      curveSegments: 24,
      bevelEnabled: false,
      bevelThickness: 1,
      bevelSize: 1,
      bevelSegments: 1,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'text_mesh';

    const { x, y, z } = ThreeBase.getGemotryBoxCenter(geometry);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;

    const directionalLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
    directionalLight.position.set(x, y, z + 100);

    this._scene.add(directionalLight);
    this._scene.add(mesh);
  }
}

export default Text;
