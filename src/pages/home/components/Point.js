import * as THREE from 'three';
import ThreeBase from '@/common/chart/ThreeBase';

class Point extends ThreeBase {
  constructor(props) {
    super(props);

    this.mapDot = new THREE.TextureLoader().load('./image/gradient.png');
    this.controls.autoRotate = true;

    this.init();
  }

  init() {
    const geometry = new THREE.Geometry();
    for (let i = 0; i < 10000; i++) {
      const vertex = new THREE.Vector3();
      vertex.x = 800 * Math.random() - 400;
      vertex.y = 800 * Math.random() - 400;
      vertex.z = 800 * Math.random() - 400;

      geometry.vertices.push(vertex);

      geometry.colors.push(new THREE.Color(1, 1, 1));
    }
    const material = new THREE.PointsMaterial({
      size: 4,
      sizeAttenuation: true,
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      map: this.mapDot,
    });

    material.vertexColors = THREE.VertexColors;
    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);
  }
}

export default Point;
