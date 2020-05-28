import * as THREE from 'three';
import ThreeBase from '@/common/chart/ThreeBase';

class Shape extends ThreeBase {
  constructor(props) {
    super(props);
    this._shape = null;
    this.initShape();
  }

  initShape() {
    const l = 0;
    const r = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo(l + 5, r + 5);
    heartShape.bezierCurveTo(l + 5, r + 5, l + 4, r, l, r);
    heartShape.bezierCurveTo(l - 6, r, l - 6, r + 7, l - 6, r + 7);
    heartShape.bezierCurveTo(l - 6, r + 11, l - 3, r + 15.4, l + 5, r + 19);
    heartShape.bezierCurveTo(l + 12, r + 15.4, l + 16, r + 11, l + 16, r + 7);
    heartShape.bezierCurveTo(l + 16, r + 7, l + 16, r, l + 10, r);
    heartShape.bezierCurveTo(l + 7, r, l + 5, r + 5, l + 5, r + 5);
    const extrudeSettings = {
      depth: 1,
      bevelSegments: 1,
      steps: 10,
      bevelThickness: 2,
      curveSegments: 100,
      // curveSegments — int，曲线上点的数量，默认值是12。
      // steps — int，用于沿着挤出样条的深度细分的点的数量，默认值为1。
      // depth — float，挤出的形状的深度，默认值为100。
      // bevelEnabled — bool，对挤出的形状应用是否斜角，默认值为true。
      // bevelThickness — float，设置原始形状上斜角的厚度。默认值为6。
      // bevelSize — float。斜角与原始形状轮廓之间的延伸距离，默认值为bevelThickness-2。
      // bevelOffset — float. Distance from the shape outline that the bevel starts. Default is 0.
      // bevelSegments — int。斜角的分段层数，默认值为3。
      // extrudePath — THREE.Curve对象。一条沿着被挤出形状的三维样条线。
      // UVGenerator — Object。提供了UV生成器函数的对象。
    };
    const geometry = new THREE.ExtrudeBufferGeometry(
      heartShape,
      extrudeSettings,
    );

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
    });

    const mesh = new THREE.Mesh(geometry, material);

    const { x, y, z } = ThreeBase.getGemotrySphereCenter(geometry);
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;

    const directionalLight = new THREE.HemisphereLight(0xff0000, 0xff00ff, 1);
    directionalLight.position.set(x, y, z + 30);

    this._camera.position.set(0, 0, 30);

    // this._scene.add(ThreeBase.useAxesHelper());
    this._scene.add(mesh);
    this._scene.add(directionalLight);
    this._shape = mesh;
    this._controls.autoRotate = true;
  }
}

export default Shape;
