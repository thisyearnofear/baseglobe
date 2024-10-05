import * as THREE from "three";
import { Colors } from "../utils/colors";

interface WaveVertex {
  y: number;
  x: number;
  z: number;
  ang: number;
  amp: number;
  speed: number;
}

export class Sea extends THREE.Object3D {
  private waves: WaveVertex[];
  private mesh: THREE.Mesh;

  constructor() {
    super();
    this.waves = [];
    this.mesh = new THREE.Mesh();
    this.createSea();
  }

  private createSea() {
    const geom = new THREE.CylinderGeometry(600, 600, 800, 80, 20);

    geom.rotateX(-Math.PI / 2);

    // Move the sea up
    geom.translate(0, -600, 0);

    const l = geom.attributes.position.count;

    this.waves = [];

    for (let i = 0; i < l; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(
        geom.attributes.position,
        i
      );
      this.waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        ang: Math.random() * Math.PI * 2,
        amp: 5 + Math.random() * 15,
        speed: 0.016 + Math.random() * 0.032,
      });
    }

    const mat = new THREE.MeshPhongMaterial({
      color: Colors.blue,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide, // Render both sides of the geometry
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;

    this.add(this.mesh);
  }

  moveWaves() {
    const positions = (this.mesh.geometry as THREE.BufferGeometry).attributes
      .position;
    const l = positions.count;

    for (let i = 0; i < l; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positions, i);
      const vprops = this.waves[i];
      v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
      v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
      vprops.ang += vprops.speed;
      positions.setXYZ(i, v.x, v.y, v.z);
    }

    positions.needsUpdate = true;
    (this.mesh.geometry as THREE.BufferGeometry).computeVertexNormals();
  }
}

export function createSea(): Sea {
  return new Sea();
}
