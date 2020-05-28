import * as THREE from 'three';
import { OrbitControls } from './OrbitControls';

class ThreeBaseStatic {
  static getGemotryBoxCenter(geo) {
    if (!geo.boundingBox) geo.computeBoundingBox();
    const { max, min } = geo.boundingBox;
    return new THREE.Vector3(
      -0.5 * (max.x - min.x),
      -0.5 * (max.y - min.y),
      -0.5 * (max.z - min.z),
    );
  }

  static getGemotrySphereCenter(geo) {
    if (!geo.boundingSphere) geo.computeBoundingSphere();
    const { center } = geo.boundingSphere;
    return {
      x: -center.x,
      y: -center.y,
      z: -center.z,
    };
  }

  static useAxesHelper(num = 100) {
    return new THREE.AxesHelper(num);
  }
}

class ThreeBase extends ThreeBaseStatic {
  constructor(props = {}) {
    super(props);
    this._props = {
      fov: 75,
      width: 100,
      height: 100,
      near: 0.1,
      far: 10000,
      position: [0, 0, 100],
      ...props,
    };

    this._initRender();
    this._initCamera();
    this._initScene();
    this._inintOrbitControls();
  }

  _stopAni = undefined;
  _renderer = null;
  _camera = null;
  _scene = null;
  _controls = null;
  _animateId = null;

  get domElement() {
    return this._renderer.domElement;
  }

  get camera() {
    return this._camera;
  }

  get scene() {
    return this._scene;
  }

  get renderer() {
    return this._renderer;
  }

  get controls() {
    return this._controls;
  }

  _inintOrbitControls() {
    const controls = new OrbitControls(this.camera, this.domElement);
    // controls.autoRotate = true;
    // controls.autoRotateSpeed = 8;
    // controls.enableKeys = false;
    // controls.enablePan = false;
    // controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI * 2;
    controls.minPolarAngle = -Math.PI * 2;
    controls.update();
    this._controls = controls;
  }

  _initRender() {
    const { width, height } = this._props;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    this._renderer = renderer;
  }

  _initCamera() {
    const { fov, width, height, near, far, position } = this._props;
    const camera = new THREE.PerspectiveCamera(fov, width / height, near, far);
    camera.position.set(...position);
    camera.lookAt(new THREE.Vector3());
    this._camera = camera;
  }

  _initScene() {
    const scene = new THREE.Scene();
    this._scene = scene;
  }

  render() {
    this._renderer.render(this._scene, this._camera);
  }

  animate() {
    this._controls.enabled = true;
    cancelAnimationFrame(this._stopAni);
    this._stopAni = requestAnimationFrame(this.animate.bind(this));
    this.animateContent();
    this._camera.updateMatrixWorld();
    this._controls.update();
    this.render();
  }

  // 动画函数
  animateContent() {}

  resize(w, h) {
    this._camera.aspect = w / h;
    this._camera.updateProjectionMatrix();
    this._renderer.setSize(w, h);
  }

  stopRender() {
    this._controls.enabled = false;
    cancelAnimationFrame(this._stopAni);
    this._stopAni = undefined;
  }

  destory() {
    this.stopRender();
    this._scene.dispose();
    this._renderer.clear();
    this._renderer = null;
    this._camera = null;
    this._scene = null;
    this._controls = null;
  }

  deleteObject3D(name) {
    const group = this._scene.getObjectByName(name);
    if (!group) return;
    group.traverse(item => {
      if (item instanceof THREE.Mesh) {
        item.geometry.dispose();
        item.material.dispose();
      }
    });
    this._scene.remove(group);
  }
}

export default ThreeBase;
