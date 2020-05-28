import * as THREE from 'three';
import * as d3geo from 'd3-geo';
import ThreeBase from '@/common/chart/ThreeBase';

class Map extends ThreeBase {
  constructor(props) {
    super(props);
    this.geoJson = null;
    this.map = new THREE.Object3D();
    this.initHelper();
    this.initMap();

    this.controls.enableKeys = false;
    this.controls.enablePan = false;
    this.camera.position.set(0, 0, 10);
  }

  animateContent() {
    // this.map.rotation.x += 0.001;
  }

  initHelper() {
    const gridHelper = new THREE.GridHelper(20, 20);
    gridHelper.rotation.set(Math.PI / 4, 0, 0);
    this.scene.add(gridHelper);
  }

  async initMap() {
    if (!this.geoJson) this.geoJson = await this.loadGeoJson();

    //  墨卡托投影
    const projection = d3geo
      .geoMercator()
      .center([104.0, 37.5])
      .scale(10)
      .translate([0, 0]);

    //  处理地理数据
    this.geoJson.features.forEach(({ geometry }) => {
      //  建立省份的group集合
      const province = new THREE.Object3D();

      //  随机生产颜色
      const color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random(),
      );

      //  通用的ExtrudeGeometry设置
      const extrudeSettings = {
        depth: 1,
        bevelEnabled: false,
      };

      //  通用的材质设置
      /** 想法 *** 可以用光材质+光 做流影效果。 ***/
      const material = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 1,
      });

      const { type, coordinates } = geometry;
      //  区分不同多边形
      if (type === 'MultiPolygon') {
        coordinates.forEach(multiPolygon => {
          multiPolygon.forEach(polygon => {
            const shape = new THREE.Shape();
            polygon.forEach((t, i) => {
              const [x, y] = projection(t);
              if (i === 0) shape.moveTo(x, -y);
              shape.lineTo(x, -y);
            });
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, material);
            province.add(mesh);
          });
        });
      } else {
        coordinates.forEach(polygon => {
          const shape = new THREE.Shape();
          polygon.forEach((t, i) => {
            const [x, y] = projection(t);
            if (i === 0) shape.moveTo(x, -y);
            shape.lineTo(x, -y);
          });
          const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
          const mesh = new THREE.Mesh(geometry, material);
          province.add(mesh);
        });
      }
      this.map.add(province);
    });
    this.map.rotation.set(-Math.PI / 4, 0, 0);
    this.scene.add(this.map);
  }

  loadGeoJson() {
    const loader = new THREE.FileLoader();
    loader.setResponseType('json');
    return new Promise((resolve, reject) => {
      loader.load(
        './geoJson/china_geoJson.json',
        function(data) {
          resolve(data);
        },
        function() {},
        function(error) {
          reject(error);
        },
      );
    });
  }
}

export default Map;
